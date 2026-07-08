import "./Landing-Page.css";

// Hero Section Assets
import HeroCheck from "../../assets/landing-page/tick.png";
import Widget1 from "../../assets/landing-page/widget1.png";
import Widget2 from "../../assets/landing-page/widget2.png";
import Widget3 from "../../assets/landing-page/widget3.png";
import iconF from "../../assets/landing-page/iconF.png";
import iconH from "../../assets/landing-page/iconH.png";
import iconS from "../../assets/landing-page/iconS.png";
import iconP from "../../assets/landing-page/iconP.png";
import iconA from "../../assets/landing-page/iconA.png";
import brandbadge from "../../assets/landing-page/IconE.png";
import HeroAbstractLeft from "../../assets/landing-page/subbg.png";
import HeroAbstractRight from "../../assets/landing-page/subbg.png";

// Trusted Section Assets
import TrustedTopLeft from "../../assets/landing-page/graph5.png";
import TrustedTopRight from "../../assets/landing-page/dataimg6.png";
import TrustedBottomPattern from "../../assets/landing-page/trustedbg2.png";
import AxisLogo from "../../assets/landing-page/axis.png";
import HDFCLogo from "../../assets/landing-page/hdfc.png";
import RelianceLogo from "../../assets/landing-page/reliance.png";
import DmartLogo from "../../assets/landing-page/Dmart.png";
import TataLogo from "../../assets/landing-page/tata.png";
import DHLLogo from "../../assets/landing-page/dhl.png";

// Platform Overview Assets
import IconDataIntegration from "../../assets/landing-page/dbicon.png";
import IconDataWarehouse from "../../assets/landing-page/dataimg.png";
import IconBusinessIntelligence from "../../assets/landing-page/graph-icon.png";
import IconAIAnalytics from "../../assets/landing-page/ai.png";
import IconSecurity from "../../assets/landing-page/gaurd.png";
import IconBilling from "../../assets/landing-page/payment.png";

// Dashboard Showcase Assets
import DashboardBGLeft from "../../assets/landing-page/subbg2.png";
import DashboardBGRight from "../../assets/landing-page/subbg3.png";
import Dashboard1 from "../../assets/landing-page/bargraph1.png";
import Dashboard2 from "../../assets/landing-page/bargraph2.png";
import Dashboard3 from "../../assets/landing-page/piegraph1.png";
import Dashboard4 from "../../assets/landing-page/graph1.png";
import DashIcon1 from "../../assets/landing-page/snapicon1.png";
import DashIcon2 from "../../assets/landing-page/snapicon2.png";
import DashIcon3 from "../../assets/landing-page/snapicon3.png";
import DashIcon4 from "../../assets/landing-page/bar-icon.png";

// How It Works Assets
import HowBGBottom from "../../assets/landing-page/subbg4.png";
import HowBGTopRight from "../../assets/landing-page/Realistic Abstract 4.png";
import HowBGTopLeft from "../../assets/landing-page/Realistic Abstract 3.png";
import StepIcon1 from "../../assets/landing-page/home.png";
import StepIcon2 from "../../assets/landing-page/dataimg2.png";
import StepIcon3 from "../../assets/landing-page/dataimg3.png";
import StepIcon4 from "../../assets/landing-page/dataimg4.png";

// Stats Section Assets
import StatIcon from "../../assets/landing-page/Ellipse 2026.png";

// Footer Assets
import FooterLogoMark from "../../assets/landing-page/IconE.png";

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
  },
  {
    title: "Data Warehouse",
    desc: "Centralized, secure and scalable data storage with historical tracking and multi-tenant architecture.",
    icon: IconDataWarehouse,
  },
  {
    title: "Business Intelligence",
    desc: "Power BI & Tableau dashboards for real-time reporting, KPI tracking and automated analytics.",
    icon: IconBusinessIntelligence,
  },
  {
    title: "AI Analytics",
    desc: "Leverage machine learning models for forecasting, churn prediction and demand planning.",
    icon: IconAIAnalytics,
  },
  {
    title: "Security & Governance",
    desc: "Role-based access control, data security, compliance and audit logging.",
    icon: IconSecurity,
  },
  {
    title: "Subscription & Billing",
    desc: "Flexible SaaS subscription plans with automated billing, invoicing and license management.",
    icon: IconBilling,
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
  },
  {
    no: "02",
    title: "Transform",
    text: "Clean, validate and transform data for accuracy.",
    icon: StepIcon2,
  },
  {
    no: "03",
    title: "Analyse",
    text: "Generate insights with powerful dashboards and AI models.",
    icon: StepIcon3,
  },
  {
    no: "04",
    title: "Act",
    text: "Make smarter decisions and drive business growth.",
    icon: StepIcon4,
  },
];

const stats = [
  { value: "10,000+", label: "Concurrent Users Supported" },
  { value: "99.9%", label: "System Uptime Guarantee" },
  { value: "100GB+", label: "Daily Data Processing" },
  { value: "500+", label: "Enterprise Grade Resources" },
  { value: "24/7", label: "Monitoring & Support" },
];

export default function LandingPage() {
  return (
    <main className="landing-page">
      <section className="hero">
        <img className="hero-abstract hero-abstract-left" src={HeroAbstractLeft} alt="" />
        <img className="hero-abstract hero-abstract-right" src={HeroAbstractRight} alt="" />

        <header className="hero-nav-wrap">
          <div className="brand-pill">
            <img className="brand-badge" src={brandbadge} alt="E" />
            <span className="brand-name">EDABIP</span>
          </div>
          <nav className="hero-nav">
            <div className="hero-nav-links">
            <a href="#!" className="hero-nav-link hero-nav-link-home">
              Home <img src={iconH} alt="" />
            </a>
            <a href="#!" className="hero-nav-link hero-nav-link-feat">
              Features <img src={iconF} alt="" />
            </a>
            <a href="#!" className="hero-nav-link hero-nav-link-services">
              Services <img src={iconS} alt="" />
            </a>
            <a href="#!" className="hero-nav-link hero-nav-link-price">
              Pricing <img src={iconP} alt="" />
            </a>
            <a href="#!" className="hero-nav-link hero-nav-link-about">
              About Us <img src={iconA} alt="" />
            </a>
            </div>
          </nav>
          <button className="primary-btn small">Book a Demo</button>
        </header>

        <div className="hero-content">
          <h1>
            Transform Enterprise Data into Actionable
          </h1>
          <div className="hero-bullets">
            {[
              "Real-Time KPI Monitoring",
              "AI-Powered Business Insights",
              "Advanced Analytics & Reporting",
            ].map((text, index) => (
              <div key={index} className="hero-bullet">
                <img src={HeroCheck} alt="" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <button className="primary-btn">Explore Platform</button>
        </div>
        <div className="hero-panels">
  <article className="hero-panel large">   {/* 528px — Executive Analytics */}
    <img src={Widget1} alt="Executive Analytics" className="panel-widget" />
    <h4>Executive Analytics</h4>
    <p>Gain complete visibility into business performance</p>
  </article>
  <article className="hero-panel medium">  {/* 430px — AI Predictive Intelligence */}
    <img src={Widget2} alt="AI Predictive" className="panel-widget" />
    <h4>AI Predictive Intelligence</h4>
    <p>Predict revenue, customer behavior</p>
  </article>
  <article className="hero-panel small">   {/* 362px — Revenue Performance */}
    <img src={Widget3} alt="Revenue Performance" className="panel-widget" />
    <h4>Revenue Performance</h4>
    <p>Monitor revenue streams, profitability</p>
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
          <small>PLATFORM OVERVIEW</small>
          <h2>
            One Platform. <span>Unlimited Insights.</span>
          </h2>
        </div>
        <div className="platform-grid">
          {platformCards.map((card, index) => (
            <article key={index} className="platform-card">
              <div className="platform-icon">
                <img src={card.icon} alt={card.title} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
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
            powerful dashboards for <span>every decision</span>
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
        <img className="how-bg how-bottom" src={HowBGBottom} alt="" />
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
            </article>
          ))}
        </div>
      </section>

      <section className="stats-strip">
        {stats.map((item, index) => (
          <article key={index} className="stat-item">
            <div className="stat-dot">
              <img src={StatIcon} alt="" />
            </div>
            <div>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          </article>
        ))}
      </section>

      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={FooterLogoMark} alt="EDABIP" />
              <span>EDABIP</span>
            </div>
            <p>8819 Ohio St. South Gate, CA 90280</p>
            <p>Ourstudio@hello.com</p>
            <p>+1 386-688-3295</p>
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
            <p>Hyderabad-500032</p>
            <p>info@stackly.com</p>
            <p>+ 123 456 789</p>
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
