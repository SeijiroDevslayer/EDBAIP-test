import "./Landing-Page.css";
import { Link } from "react-router-dom";
// Hero Section Assets
import HeroCheck from "../../assets/landing-page/tick1.png";
import Widget1 from "../../assets/landing-page/widget1.png";
import Widget2 from "../../assets/landing-page/widget2.png";
import Widget3 from "../../assets/landing-page/widget3.png";
import brandbadge from "../../assets/landing-page/logo.png";
import HeroBg from "../../assets/landing-page/hero-bg.png";

// Trusted Section Assets
import TrustedTopLeft from "../../assets/landing-page/trend-graph.png";
import TrustedTopRight from "../../assets/landing-page/trusted-right.png";
import TrustedBottomPattern from "../../assets/landing-page/trustedbg2.png";
import AxisLogo from "../../assets/landing-page/axis.png";
import HDFCLogo from "../../assets/landing-page/hdfc.png";
import RelianceLogo from "../../assets/landing-page/relianceee.png";
import DmartLogo from "../../assets/landing-page/Dmart.png";
import TataLogo from "../../assets/landing-page/tata.png";
import DHLLogo from "../../assets/landing-page/dhl.png";

// Platform Overview Assets
import IconDataIntegration from "../../assets/landing-page/dbicon.png";
import IconDataWarehouse from "../../assets/landing-page/home.png";
import PlatformOverviewright from "../../assets/landing-page/dataimg.png";
import PlatformOverviewleft from "../../assets/landing-page/graph6.png";
import IconBusinessIntelligence from "../../assets/landing-page/barcomponent.png";
import IconAIAnalytics from "../../assets/landing-page/ai.png";
import IconSecurity from "../../assets/landing-page/gaurd.png";
import IconBilling from "../../assets/landing-page/payment.png";
import IllustrationDataIntegration from "../../assets/landing-page/dataimg4.png";
import IllustrationDataWarehouse from "../../assets/landing-page/datamodel1.png";
import IllustrationBI from "../../assets/landing-page/graph1.png";
import IllustrationAI from "../../assets/landing-page/graph4.png";
import IllustrationSecurity from "../../assets/landing-page/dataimg5.png";
import IllustrationBilling from "../../assets/landing-page/bargraph1.png";
import PlatformOverviewCenter from "../../assets/landing-page/barimg.png";

// Dashboard Showcase Assets
import DashboardBGLeft from "../../assets/landing-page/dataimg3.png";
import DashboardBGRight from "../../assets/landing-page/piegraph1.png";
import Dashboard1 from "../../assets/landing-page/gradient3.png";
import Dashboard2 from "../../assets/landing-page/gradient2.png";
import Dashboard3 from "../../assets/landing-page/gradient1.png";
import Dashboard4 from "../../assets/landing-page/gradient4.png";
import DashIcon1 from "../../assets/landing-page/map-icon.png";
import DashIcon2 from "../../assets/landing-page/graph-icon.png";
import DashIcon3 from "../../assets/landing-page/bar-icon.png";
import DashIcon4 from "../../assets/landing-page/persons.png";

// How It Works Assets
import HowBGBottom from "../../assets/landing-page/subbg21.png";
import HowBGTopRight from "../../assets/landing-page/dataforecast1.png";
import HowBGTopLeft from "../../assets/landing-page/graph2.png";
import StepIcon1 from "../../assets/landing-page/dbicon.png";
import StepIcon2 from "../../assets/landing-page/way.png";
import StepIcon3 from "../../assets/landing-page/sched.png";
import StepIcon4 from "../../assets/landing-page/target.png";
import Illustration1 from "../../assets/landing-page/planimg.png";
import Illustration2 from "../../assets/landing-page/datamodel2.png";
import Illustration3 from "../../assets/landing-page/dataimg2.png";
import Illustration4 from "../../assets/landing-page/graph3.png";

// Stats Section Assets
import StatIconUsers from "../../assets/landing-page/People-stat.png";
import StatIconUptime from "../../assets/landing-page/Time-stat.png";
import StatIconData from "../../assets/landing-page/db-stat.png";
import StatIconResources from "../../assets/landing-page/work-stat.png";
import StatIconSupport from "../../assets/landing-page/speaker-stat.png";

// CTA Section Assets
import CTAFrame from "../../assets/landing-page/ctaframe.png";

// Footer Assets
import FooterLogoMark from "../../assets/landing-page/logo.png";
import Location from "../../assets/landing-page/location_on.png";
import Email from "../../assets/landing-page/email.png";
import Call from "../../assets/landing-page/call.png";

const trustedLogos = [
  { name: "AXIS MAX", img: AxisLogo },
  { name: "HDFC BANK", img: HDFCLogo },
  { name: "Reliance", img: RelianceLogo },
  { name: "DMart", img: DmartLogo },
  { name: "TATA MOTORS", img: TataLogo },
  { name: "DHL", img: DHLLogo },
];

const platformCards = [
  {
    title: "Data Integration",
    desc: "Connect and ingest data from ERP, CRM, HRMS, APIs, Databases and cloud systems.",
    icon: IconDataIntegration,
    illustration: IllustrationDataIntegration,
  },
  {
    title: "Data Warehouse",
    desc: "Centralized, secure and scalable data storage with historical tracking and multi-tenant architecture.",
    icon: IconDataWarehouse,
    illustration: IllustrationDataWarehouse,
  },
  {
    title: "Business Intelligence",
    desc: "Power BI & Tableau dashboards for real-time reporting, KPI tracking and automated analytics.",
    icon: IconBusinessIntelligence,
    illustration: IllustrationBI,
  },
  {
    title: "AI Analytics",
    desc: "Leverage machine learning models for forecasting, churn prediction and demand planning.",
    icon: IconAIAnalytics,
    illustration: IllustrationAI,
  },
  {
    title: "Security & Governance",
    desc: "Role-based access control, data security, compliance and audit logging.",
    icon: IconSecurity,
    illustration: IllustrationSecurity,
  },
  {
    title: "Subscription & Billing",
    desc: "Flexible SaaS subscription plans with automated billing, invoicing and license management.",
    icon: IconBilling,
    illustration: IllustrationBilling,
  },
];

const dashboardCards = [
  {
    title: "Executive Dashboard",
    text: "Track overall performance, KPIs and business health.",
    thumb: Dashboard1,
    icon: DashIcon1,
  },
  {
    title: "Sales Analytics",
    text: "Analyze sales performance, pipeline, regions and product trends.",
    thumb: Dashboard2,
    icon: DashIcon2,
  },
  {
    title: "Forecast Dashboard",
    text: "AI-powered forecasting for revenue, demand and operational planning.",
    thumb: Dashboard3,
    icon: DashIcon3,
  },
  {
    title: "Customer Analytics",
    text: "Understand customer behavior, retention and churn insights.",
    thumb: Dashboard4,
    icon: DashIcon4,
  },
];

const howSteps = [
  {
    no: "01",
    title: "Connect",
    text: "Integrate data from multiple sources seamlessly.",
    icon: StepIcon1,
    illustration: Illustration1,
  },
  {
    no: "02",
    title: "Transform",
    text: "Clean, validate and transform data for accuracy.",
    icon: StepIcon2,
    illustration: Illustration2,
  },
  {
    no: "03",
    title: "Analyse",
    text: "Generate insights with powerful dashboards and AI models.",
    icon: StepIcon3,
    illustration: Illustration3,
  },
  {
    no: "04",
    title: "Act",
    text: "Make smarter decisions and drive business growth.",
    icon: StepIcon4,
    illustration: Illustration4,
  },
];

const stats = [
  { value: "10,000+", label: "Concurrent Users Supported", icon: StatIconUsers },
  { value: "99.9%", label: "System Uptime Guarantee", icon: StatIconUptime },
  { value: "100GB+", label: "Daily Data Processing", icon: StatIconData },
  { value: "500+", label: "Enterprise Grade Resources", icon: StatIconResources },
  { value: "24/7", label: "Monitoring & Support", icon: StatIconSupport },
];
export default function LandingPage() {
  return (
    <main className="landing-page">
      <section className="hero">
  <img
    className="hero-background-image"
    src={HeroBg}
    alt=""
    aria-hidden="true"
  />

  <header className="hero-nav-wrap">
    <a href="#home" className="brand-pill" aria-label="EDABIP home">
      <img className="brand-badge" src={brandbadge} alt="" />
      <span className="brand-name">EDABIP</span>
    </a>

    <nav className="hero-nav" aria-label="Main navigation">
      <a href="#home" className="hero-nav-link active">
        Home
      </a>

      <a href="#features" className="hero-nav-link">
        Features
      </a>

      <a href="#services" className="hero-nav-link">
        Services
      </a>

      <a href="#pricing" className="hero-nav-link">
        Pricing
      </a>

      <a href="#about" className="hero-nav-link">
        About Us
      </a>
    </nav>

    <div className="hero-nav-actions">
      <Link to="/login" className="nav-login-btn">
        Login
      </Link>

      <Link to="/signup" className="nav-signup-btn">
        Sign Up
      </Link>
      </div>
  </header>

  <div className="hero-content">
    <h1>
      <span className="hero-title-main">
        Transform Enterprise Data
      </span>

      <span className="hero-title-accent">
        into Actionable
      </span>
    </h1>

    <div className="hero-bullets">
      {[
        "Real-Time KPI Monitoring",
        "AI-Powered Business Insights",
        "Advanced Analytics & Reporting",
      ].map((text) => (
        <div key={text} className="hero-bullet">
          <img src={HeroCheck} alt="" />
          <span>{text}</span>
        </div>
      ))}
    </div>

    <button type="button" className="primary-btn hero-explore-btn">
      Explore Platform
    </button>
  </div>

  <div className="hero-panels">
    <article className="hero-panel hero-panel-large">
      <img
        src={Widget1}
        alt="Executive analytics report"
        className="panel-widget"
      />

      <div className="hero-panel-copy">
        <h4>Executive Analytics</h4>
        <p>Gain complete visibility into business performance</p>
      </div>
    </article>

    <article className="hero-panel hero-panel-medium">
      <img
        src={Widget2}
        alt="AI predictive intelligence"
        className="panel-widget"
      />

      <div className="hero-panel-copy">
        <h4>AI Predictive Intelligence</h4>
        <p>Predict revenue, customer behavior</p>
      </div>
    </article>

    <article className="hero-panel hero-panel-small">
      <img
        src={Widget3}
        alt="Revenue performance"
        className="panel-widget"
      />

      <div className="hero-panel-copy">
        <h4>Revenue Performance</h4>
        <p>Monitor revenue streams, profitability</p>
      </div>
    </article>
  </div>
</section>

      <section className="trusted">
        <img className="trusted-bg trusted-left" src={TrustedTopLeft} alt="" />
        <img className="trusted-bg trusted-right" src={TrustedTopRight} alt="" />
        <h5>TRUSTED BY <span>INDUSTRY LEADERS</span></h5>
        <p>
          Join hundreds of leading organizations that trust EDABIP
          to power their data-driven decisions.
        </p>
        <div className="trusted-strip">
          {trustedLogos.map((logo, index) => (
            <div key={index} className="trusted-logo">
              <img src={logo.img} alt={logo.name} />
            </div>
          ))}
        </div>
        <img src={TrustedBottomPattern} alt="" className="trusted-bottom-img"/>
      </section>

      <section className="platform-overview">
        <div className="section-title">
        <img className="trusted-bg platform-overview-left" src={PlatformOverviewleft} alt="" />
        <img className="trusted-bg platform-overview-right" src={PlatformOverviewright} alt="" />
          <small>PLATFORM OVERVIEW</small>
          <h2>
             One Platform<span className="title-dot"></span> <span>Unlimited Insights<span className="title-dot"></span> </span>
          </h2>
        </div>
        <img className="platform-overview-center" src={PlatformOverviewCenter} alt="" />
        <div className="platform-grid">
            {platformCards.map((card, index) => (
              <article key={index} className="platform-card">
                <div className="platform-icon">
                  <img src={card.icon} alt={card.title} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <img
                  className="platform-card-illustration"
                  src={card.illustration}
                  alt=""
                />
              </article>
            ))}
          </div>
      </section>

      <section className="dashboard-showcase">
        <img className="dash-bg dash-left" src={DashboardBGLeft} alt="" />
        <img className="dash-bg dash-right" src={DashboardBGRight} alt="" />
        <div className="section-title">
          <small>DASHBOARD SHOWCASE</small>
          <h2>
            POWERFUL DASHBOARD FOR  <span>EVERY DECISION</span>
          </h2>
        </div>
        <div className="dashboard-grid">
          {dashboardCards.map((card, index) => (
            <article key={index} className="dashboard-card">
              <div className="dash-thumb">
                <img src={card.thumb} alt={card.title} />
              </div>
              <div className="dashboard-copy">
                <div className="dash-icon">
                  <img src={card.icon} alt="" />
                </div>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <img className="how-bg how-left" src={HowBGTopLeft} alt="" />
        <img className="how-bg how-right" src={HowBGTopRight} alt="" />
        <div className="section-title">
          <small>HOW IT WORKS</small>
          <h2>
            from data to decisions in <span>4 simple steps</span>
          </h2>
        </div>
        <div className="steps-grid">
          {howSteps.map((step, index) => (
            <article key={index} className="step-card">
              <span className="step-no">{step.no}</span>
              <div className="step-icon">
                <img src={step.icon} alt={step.title} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <img
                  className="step-card-illustration"
                  src={step.illustration}
                  alt=""
                />
            </article>
          ))}
        </div>
        <img className="how-bg how-bottom" src={HowBGBottom} alt="" />
      </section>

          <section className="stats-strip">
            {stats.map((item, index) => (
              <article key={index} className="stat-item">
                <div className="stat-dot">
                  <img src={item.icon} alt="" />
                </div>
                <div>
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                </div>
              </article>
            ))}
          </section>

      <section className="cta-banner">
        <img
          className="cta-banner-frame"
          src={CTAFrame}
          alt="Ready to Transform Your Data Strategy? Join hundreds of enterprises who trust EDABIP to power their data-driven decisions."
        />
        <button
          className="cta-banner-btn-overlay"
          aria-label="Book a Demo"
        />
      </section>

      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
             <div className="footer-logo">
                <img src={FooterLogoMark} alt="EDABIP" />
                <span>EDABIP</span>
              </div>
                  <p><img src={Location} alt="" className="footer-icon" /> 8819 Ohio St. South Gate, CA 90280</p>
                  <p><img src={Email} alt="" className="footer-icon" /> Ourstudio@hello.com</p>
                  <p><img src={Call} alt="" className="footer-icon" /> +1 386-688-3295</p>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <a href="#!">Feature</a>
            <a href="#!">Dashboards</a>
            <a href="#!">Integration</a>
            <a href="#!">Security</a>
          </div>

          <div className="footer-col">
            <h4>Solutions</h4>
            <a href="#!">By Industry</a>
            <a href="#!">By Department</a>
            <a href="#!">Use Cases</a>
            <a href="#!">AI Analytics</a>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <a href="#!">Documentation</a>
            <a href="#!">Blog</a>
            <a href="#!">Case studies</a>
            <a href="#!">Support</a>
          </div>


          <div className="footer-col footer-contact">
            <h4>Contact Us</h4>
            <p><img src={Location} alt="" className="footer-icon" /> Hyderabad-500032</p>
            <p><img src={Email} alt="" className="footer-icon" /> info@stackly.com</p>
            <p><img src={Call} alt="" className="footer-icon" /> + 123 456 789</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 EDABIP. All rights reserved.</p>
          <div>
            <a href="#!">Privacy Policy</a>
            <a href="#!">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
