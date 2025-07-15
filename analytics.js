// Simple analytics tracking for CodeSentry MVP
class Analytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.events = [];
        this.startTime = Date.now();
        this.initializeTracking();
    }

    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    initializeTracking() {
        // Track page view
        this.trackEvent('page_view', {
            page: window.location.pathname,
            referrer: document.referrer,
            timestamp: Date.now()
        });

        // Track user interactions
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                this.trackEvent('button_click', {
                    button_text: e.target.textContent.trim(),
                    button_id: e.target.id,
                    timestamp: Date.now()
                });
            }
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            this.trackEvent('form_submit', {
                form_id: e.target.id,
                timestamp: Date.now()
            });
        });

        // Track code analysis
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            this.setupCodeAnalysisTracking();
        }

        // Track session duration on page unload
        window.addEventListener('beforeunload', () => {
            this.trackEvent('session_end', {
                duration: Date.now() - this.startTime,
                events_count: this.events.length
            });
            this.sendAnalytics();
        });

        // Send analytics every 30 seconds
        setInterval(() => {
            this.sendAnalytics();
        }, 30000);
    }

    setupCodeAnalysisTracking() {
        // Track when user starts code analysis
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => {
                const code = document.getElementById('codeInput').value;
                const language = document.getElementById('language').value;
                
                this.trackEvent('code_analysis_start', {
                    language: language,
                    code_length: code.length,
                    lines_count: code.split('\n').length,
                    timestamp: Date.now()
                });
            });
        }

        // Track when results are displayed
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'class' && 
                    mutation.target.id === 'resultsSection') {
                    
                    if (!mutation.target.classList.contains('hidden')) {
                        this.trackEvent('code_analysis_complete', {
                            timestamp: Date.now()
                        });
                    }
                }
            });
        });

        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            observer.observe(resultsSection, { attributes: true });
        }
    }

    trackEvent(eventName, data = {}) {
        const event = {
            session_id: this.sessionId,
            event_name: eventName,
            timestamp: Date.now(),
            user_agent: navigator.userAgent,
            page_url: window.location.href,
            ...data
        };

        this.events.push(event);
        console.log('Event tracked:', event);
        
        // Store in localStorage for persistence
        this.storeAnalytics();
    }

    storeAnalytics() {
        const analytics = {
            session_id: this.sessionId,
            events: this.events,
            last_updated: Date.now()
        };
        
        localStorage.setItem('codesentry_analytics', JSON.stringify(analytics));
    }

    sendAnalytics() {
        if (this.events.length === 0) return;

        // In a real app, you'd send this to your analytics endpoint
        // For now, we'll simulate the request and store locally
        const analyticsData = {
            session_id: this.sessionId,
            events: this.events,
            timestamp: Date.now()
        };

        // Simulate API call
        console.log('Sending analytics to server:', analyticsData);
        
        // Store in a "sent" analytics array
        const sentAnalytics = JSON.parse(localStorage.getItem('codesentry_sent_analytics') || '[]');
        sentAnalytics.push(analyticsData);
        localStorage.setItem('codesentry_sent_analytics', JSON.stringify(sentAnalytics));
        
        // Clear events after sending
        this.events = [];
    }

    // Method to get analytics insights
    getAnalyticsInsights() {
        const sentAnalytics = JSON.parse(localStorage.getItem('codesentry_sent_analytics') || '[]');
        
        let totalSessions = sentAnalytics.length;
        let totalEvents = 0;
        let codeAnalysisCount = 0;
        let emailSignups = 0;
        let languages = {};

        sentAnalytics.forEach(session => {
            totalEvents += session.events.length;
            
            session.events.forEach(event => {
                if (event.event_name === 'code_analysis_start') {
                    codeAnalysisCount++;
                    if (event.language) {
                        languages[event.language] = (languages[event.language] || 0) + 1;
                    }
                }
                if (event.event_name === 'form_submit') {
                    emailSignups++;
                }
            });
        });

        return {
            totalSessions,
            totalEvents,
            codeAnalysisCount,
            emailSignups,
            popularLanguages: Object.entries(languages)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5),
            conversionRate: totalSessions > 0 ? (emailSignups / totalSessions * 100).toFixed(2) : 0
        };
    }
}

// Initialize analytics when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.codeSentryAnalytics = new Analytics();
    
    // Add a simple dashboard for viewing analytics (developer mode)
    if (window.location.search.includes('debug=true')) {
        setTimeout(() => {
            const insights = window.codeSentryAnalytics.getAnalyticsInsights();
            console.log('Analytics Insights:', insights);
        }, 1000);
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Analytics;
}