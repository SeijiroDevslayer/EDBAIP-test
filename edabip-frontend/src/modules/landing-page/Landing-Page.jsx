import "./Landing-Page.css";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Hero Section Assets
import HeroCheck from "../../assets/landing-page/tick1.png";
import Widget1 from "../../assets/landing-page/widget1.png";
import Widget2 from "../../assets/landing-page/widget2.png";
import Widget3 from "../../assets/landing-page/widget3.png";
import brandbadge from "../../assets/landing-page/logo.png";
import HeroBg from "../../assets/landing-page/hero-bg.jpg";

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

// Why EDABIP Section Assets
import WhyEdabipBg from "../../assets/landing-page/Why EDABIP 3rd section/bgg-1.jpg";
import WhyIcon1 from "../../assets/landing-page/Why EDABIP 3rd section/Unified Data Ecosystem.svg";
import WhyIcon2 from "../../assets/landing-page/Why EDABIP 3rd section/Scalable Architecture.svg";
import WhyIcon3 from "../../assets/landing-page/Why EDABIP 3rd section/Enterprise-Grade Security.svg";
import WhyIcon4 from "../../assets/landing-page/Why EDABIP 3rd section/Faster Decision Making.svg";
import WhyIcon5 from "../../assets/landing-page/Why EDABIP 3rd section/AI-Powered Analytics.svg";
import WhyIcon6 from "../../assets/landing-page/Why EDABIP 3rd section/Real-Time Business Insights.svg";

// 4th Section (Platform Services) Assets
import FourthSectionDataIntegration from "../../assets/landing-page/4th section/Data Integration.svg";
import FourthSectionDataWarehouse from "../../assets/landing-page/4th section/Data Warehouse.svg";
import FourthSectionBI from "../../assets/landing-page/4th section/Business Intelligence.svg";
import FourthSectionAIAnalytics from "../../assets/landing-page/4th section/AI Analytics.svg";
import HeroCheck1 from "../../assets/landing-page/4th section/tick.svg";

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
import ArrowIcon from "../../assets/landing-page/arrow.svg";
// Services Section Assets
import ServicesDataEngineering from "../../assets/landing-page/Services section/Data Engineering.svg";
import ServicesBIDevelopment from "../../assets/landing-page/Services section/BI Development.svg";
import ServicesAIConsulting from "../../assets/landing-page/Services section/AI Consulting.svg";
import ServicesManagedAnalytics from "../../assets/landing-page/Services section/Managed Analytics.svg";
import ServiceCheck from "../../assets/landing-page/Services section/serviceTick.svg";

// How It Works Assets
import HowBGBottom from "../../assets/landing-page/subbg21.png";
import HowBGTopRight from "../../assets/landing-page/dataforecast1.png";
import HowBGTopLeft from "../../assets/landing-page/graph2.png";
import StepIcon1 from "../../assets/landing-page/How It Works section/Connect.svg";
import StepIcon2 from "../../assets/landing-page/How It Works section/Process.svg";
import StepIcon3 from "../../assets/landing-page/How It Works section/Analyze.svg";
import StepIcon4 from "../../assets/landing-page/How It Works section/Visualize.svg";
import Illustration1 from "../../assets/landing-page/planimg.png";
import Illustration2 from "../../assets/landing-page/datamodel2.png";
import Illustration3 from "../../assets/landing-page/dataimg2.png";
import Illustration4 from "../../assets/landing-page/graph3.png";

// Industries Section Assets
import IndustryBanking from "../../assets/landing-page/INDUSTRIES section/Banking.svg";
import IndustryRetail from "../../assets/landing-page/INDUSTRIES section/Retail.svg";
import IndustryManufacturing from "../../assets/landing-page/INDUSTRIES section/Manufacturing.svg";
import IndustryTelecom from "../../assets/landing-page/INDUSTRIES section/Telecom.svg";
import IndustryHealthcare from "../../assets/landing-page/INDUSTRIES section/Healthcare.svg";
import IndustryGovernment from "../../assets/landing-page/INDUSTRIES section/Government.svg";
import IndustryEducation from "../../assets/landing-page/INDUSTRIES section/Education.svg";
import IndustryLogistics from "../../assets/landing-page/INDUSTRIES section/Logistics.svg";

// Stats Section Assets
import StatIconUsers from "../../assets/landing-page/People-stat.png";
import StatIconUptime from "../../assets/landing-page/Time-stat.png";
import StatIconData from "../../assets/landing-page/db-stat.png";
import StatIconResources from "../../assets/landing-page/work-stat.png";
import StatIconSupport from "../../assets/landing-page/speaker-stat.png";
import FaqChevron from "../../assets/landing-page/down-arrow.svg";

// Customer Reviews Section Assets
import ReviewAhmed from "../../assets/landing-page/Customer Reviews section/Ahmed Al-Farsi.svg";
import ReviewSarah from "../../assets/landing-page/Customer Reviews section/Sarah Johnson.svg";
import ReviewDavid from "../../assets/landing-page/Customer Reviews section/David Osei.svg";
import ReviewMartina from "../../assets/landing-page/Customer Reviews section/Martina Kovač.svg";
import ReviewJames from "../../assets/landing-page/Customer Reviews section/James Park.svg";
import ReviewLinh from "../../assets/landing-page/Customer Reviews section/Linh Nguyen.svg";
import StarsRow from "../../assets/landing-page/Customer Reviews section/stars.svg";

// Leadership Team Section Assets
import LeaderPriya from "../../assets/landing-page/Leadership Team section/Priya Nair.svg";
import LeaderMarc from "../../assets/landing-page/Leadership Team section/Marc Dubois.svg";
import LeaderYuki from "../../assets/landing-page/Leadership Team section/Yuki Tanaka.svg";
import LeaderKofi from "../../assets/landing-page/Leadership Team section/Kofi Acheampong.svg";

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
  { title: "Data Integration", desc: "Connect and ingest data from ERP, CRM, HRMS, APIs, Databases and cloud systems.", icon: IconDataIntegration, illustration: IllustrationDataIntegration },
  { title: "Data Warehouse", desc: "Centralized, secure and scalable data storage with historical tracking and multi-tenant architecture.", icon: IconDataWarehouse, illustration: IllustrationDataWarehouse },
  { title: "Business Intelligence", desc: "Power BI & Tableau dashboards for real-time reporting, KPI tracking and automated analytics.", icon: IconBusinessIntelligence, illustration: IllustrationBI },
  { title: "AI Analytics", desc: "Leverage machine learning models for forecasting, churn prediction and demand planning.", icon: IconAIAnalytics, illustration: IllustrationAI },
  { title: "Security & Governance", desc: "Role-based access control, data security, compliance and audit logging.", icon: IconSecurity, illustration: IllustrationSecurity },
  { title: "Subscription & Billing", desc: "Flexible SaaS subscription plans with automated billing, invoicing and license management.", icon: IconBilling, illustration: IllustrationBilling },
];

const whyEdabipCards = [
  {
    id: "unified-data",
    icon: WhyIcon1,
    title: "Unified Data Ecosystem",
    description:
      "Connect ERP, CRM, HRMS, databases, APIs, cloud platforms, and spreadsheets into a single source of truth without manual effort.",
  },
  {
    id: "ai-analytics",
    icon: WhyIcon5,
    title: "AI-Powered Analytics",
    description:
      "Leverage advanced analytics, predictive forecasting, and machine learning models to uncover trends, identify risks, and drive future growth.",
  },
  {
    id: "business-insights",
    icon: WhyIcon6,
    title: "Real-Time Business Insights",
    description:
      "Monitor KPIs, track performance metrics, and generate executive-level reports with real-time dashboards that support faster decisions.",
  },
  {
    id: "enterprise-security",
    icon: WhyIcon3,
    title: "Enterprise-Grade Security",
    description:
      "Protect sensitive business data with role-based access control, governance policies, audit tracking, and industry-standard security practices.",
  },
  {
    id: "scalable-architecture",
    icon: WhyIcon2,
    title: "Scalable Architecture",
    description:
      "Whether you're a growing startup or a large enterprise, EDABIP scales seamlessly to support increasing users, data volumes, and business requirements.",
  },
  {
    id: "faster-decisions",
    icon: WhyIcon4,
    title: "Faster Decision Making",
    description:
      "Convert raw data into meaningful insights through interactive dashboards and automated reporting, reducing the time spent on manual analysis.",
  },
];

const platformFeatures = [
  {
    id: "data-integration",
    eyebrow: "DATA INTEGRATION",
    title: "Connect Every Data Source in Minutes",
    description:
      "EDABIP connects to 200+ data sources, including databases, APIs, flat files, and cloud warehouses. Our intelligent schema mapping auto-detects relationships and normalizes formats, so your team spends time analyzing, not plumbing.",
    points: [
      "200+ pre-built connectors",
      "Auto schema detection",
      "Incremental & CDC sync",
      "Real-time streaming support",
    ],
    image: FourthSectionDataIntegration,
    imageAlt: "Connected data sources dashboard",
  },
  {
    id: "data-warehouse",
    eyebrow: "DATA WAREHOUSE",
    title: "A Warehouse Built for Analytics Speed",
    description:
      "Our columnar storage engine and smart indexing layer delivers interactive query speeds at petabyte scale. No tuning, no surprises. Query billions of rows in under a second.",
    points: [
      "Petabyte-scale storage",
      "Columnar engine",
      "Auto-partitioning",
      "Concurrency without slowdown",
    ],
    image: FourthSectionDataWarehouse,
    imageAlt: "Query performance comparison chart",
  },
  {
    id: "business-intelligence",
    eyebrow: "BUSINESS INTELLIGENCE",
    title: "Dashboards Your C-Suite Will Actually Use",
    description:
      "Drag-and-drop dashboard builder with 40+ chart types. Pixel-perfect formatting, live data, and one-click sharing. Built-in scheduling for automated report delivery.",
    points: [
      "40+ visualization types",
      "Drag & drop builder",
      "Scheduled PDF/Email reports",
      "Mobile-ready layouts",
    ],
    image: FourthSectionBI,
    imageAlt: "Sales overview dashboard",
  },
  {
    id: "ai-analytics",
    eyebrow: "AI ANALYTICS",
    title: "From Hindsight to Foresight with AI",
    description:
      "Natural language querying, anomaly detection, and ML-powered forecasting embedded directly into the platform. Ask a question in plain English and get a chart in seconds.",
    points: [
      "Natural language to SQL",
      "Anomaly detection",
      "Predictive forecasting",
      "AutoML pipeline builder",
    ],
    image: FourthSectionAIAnalytics,
    imageAlt: "AI analytics insight dashboard",
  },
];

const servicesCards = [
  {
    id: "data-engineering",
    icon: ServicesDataEngineering,
    title: "Data Engineering",
    description:
      "End-to-end pipeline design, ETL/ELT orchestration, data lake and warehouse architecture. We build robust data infrastructure tailored to your stack.",
    points: [
      "Pipeline architecture",
      "ETL/ELT automation",
      "Data lake design",
      "Real-time streaming",
    ],
  },
  {
    id: "bi-development",
    icon: ServicesBIDevelopment,
    title: "BI Development",
    description:
      "Custom dashboards, KPI frameworks, and self-service analytics. We turn raw data into the insights your decision-makers actually use.",
    points: [
      "Executive dashboards",
      "Self-service BI setup",
      "KPI framework design",
      "Report automation",
    ],
  },
  {
    id: "ai-consulting",
    icon: ServicesAIConsulting,
    title: "AI Consulting",
    description:
      "From ML model selection to deployment and monitoring. Our AI consultants embed machine intelligence into your existing workflows.",
    points: [
      "Model selection & training",
      "MLOps & monitoring",
      "NLP / forecasting",
      "AI roadmap strategy",
    ],
  },
  {
    id: "managed-analytics",
    icon: ServicesManagedAnalytics,
    title: "Managed Analytics",
    description:
      "Fully managed analytics operations, from monitoring and maintenance to ongoing optimization. Your data team on demand.",
    points: [
      "24/7 platform monitoring",
      "Data quality management",
      "Quarterly optimization",
      "Dedicated support CSM",
    ],
  },
];

const dashboardCards = [
  { title: "Executive Dashboard", text: "Track overall performance, KPIs and business health.", thumb: Dashboard1, icon: DashIcon1 },
  { title: "Sales Analytics", text: "Analyze sales performance, pipeline, regions and product trends.", thumb: Dashboard2, icon: DashIcon2 },
  { title: "Forecast Dashboard", text: "AI-powered forecasting for revenue, demand and operational planning.", thumb: Dashboard3, icon: DashIcon3 },
  { title: "Customer Analytics", text: "Understand customer behavior, retention and churn insights.", thumb: Dashboard4, icon: DashIcon4 },
];

const howSteps = [
  {
    id: "connect",
    no: "01",
    title: "Connect",
    text:
      "Link your databases, cloud apps, APIs, and file stores using our 200+ pre-built connectors. Zero code required.",
    icon: StepIcon1,
  },
  {
    id: "process",
    no: "02",
    title: "Process",
    text:
      "Define transformation rules and let EDABIP automatically clean, validate, and structure your data in real time.",
    icon: StepIcon2,
  },
  {
    id: "analyze",
    no: "03",
    title: "Analyze",
    text:
      "Run ad-hoc queries, apply ML models, and surface AI-generated insights instantly, at any scale.",
    icon: StepIcon3,
  },
  {
    id: "visualize",
    no: "04",
    title: "Visualize",
    text:
      "Share interactive dashboards and scheduled reports across your organization with role-based access.",
    icon: StepIcon4,
  },
];

const industries = [
  {
    id: "healthcare",
    icon: IndustryHealthcare,
    title: "Healthcare",
    accent: "#1f5eff",
  },
  {
    id: "banking",
    icon: IndustryBanking,
    title: "Banking",
    accent: "#6f3cff",
  },
  {
    id: "retail",
    icon: IndustryRetail,
    title: "Retail",
    accent: "#a14dff",
  },
  {
    id: "manufacturing",
    icon: IndustryManufacturing,
    title: "Manufacturing",
    accent: "#ff514f",
  },
  {
    id: "government",
    icon: IndustryGovernment,
    title: "Government",
    accent: "#21b66f",
  },
  {
    id: "education",
    icon: IndustryEducation,
    title: "Education",
    accent: "#ff7a13",
  },
  {
    id: "logistics",
    icon: IndustryLogistics,
    title: "Logistics",
    accent: "#23b96f",
  },
  {
    id: "telecom",
    icon: IndustryTelecom,
    title: "Telecom",
    accent: "#1f5eff",
  },
];

const pricingPlans = [
  {
    id: "starter",
    name: "STARTER",
    price: "$299",
    period: "/month",
    description:
      "For small teams getting started with data analytics.",
    features: [
      "Up to 5 users",
      "10 data connectors",
      "5 dashboards",
      "Daily data refresh",
      "Community support",
      "10 GB storage",
    ],
    featured: false,
  },
  {
    id: "professional",
    name: "PROFESSIONAL",
    price: "$899",
    period: "/month",
    description:
      "For growing teams that need real-time data and AI insights.",
    features: [
      "Up to 25 users",
      "50 data connectors",
      "Unlimited dashboards",
      "Real-time data refresh",
      "AI-powered analytics",
      "Priority email support",
      "500 GB storage",
      "SSO & MFA",
    ],
    featured: true,
  },
  {
    id: "enterprise",
    name: "ENTERPRISE",
    price: "Custom",
    period: "",
    description:
      "For large organizations with complex data needs.",
    features: [
      "Unlimited users",
      "200+ data connectors",
      "Custom dashboard templates",
      "Dedicated data warehouse",
      "Advanced AI & ML models",
      "24/7 dedicated support",
      "Unlimited storage",
      "SOC 2 / ISO 27001",
      "On-premise deployment option",
    ],
    featured: false,
  },
];


const reviews = [
  {
    avatar: ReviewSarah,
    name: "Sarah Johnson",
    role: "Head of Analytics",
    company: "TechVision Group",
    quote:
      "EDABIP transformed how we operate. Our reporting time dropped by 70% and we now act on live data instead of last week's exports. Truly game changing.",
  },
  {
    avatar: ReviewAhmed,
    name: "Ahmed Al-Farsi",
    role: "CTO",
    company: "Gulf Finance Corp",
    quote:
      "The AI forecasting module pays for itself. We identified a $2M revenue risk three quarters ahead of time.",
  },
  {
    avatar: ReviewLinh,
    name: "Linh Nguyen",
    role: "Analytics Director",
    company: "FutureSystems",
    quote:
      "The role-based access controls made it easy to roll this out company-wide without a security review nightmare.",
  },
  {
    avatar: ReviewDavid,
    name: "David Osei",
    role: "Data Lead",
    company: "Global Tech",
    quote:
      "Onboarding was fast and the 200+ connectors meant we didn't have to write a single custom integration.",
  },
  {
    avatar: ReviewMartina,
    name: "Martina Kovač",
    role: "VP of Operations",
    company: "DataCore",
    quote:
      "Our exec team finally trusts the numbers. Everyone looks at the same live dashboard now instead of five spreadsheets.",
  },
  {
    avatar: ReviewJames,
    name: "James Park",
    role: "COO",
    company: "CloudNexus",
    quote:
      "Support has been excellent, and the platform scales with us as we've added more regions and users.",
  },
];

const leaders = [
  { avatar: LeaderMarc, name: "Marc Dubois", role: "CEO & Co-founder" },
  { avatar: LeaderYuki, name: "Yuki Tanaka", role: "CTO & Co-founder" },
  { avatar: LeaderKofi, name: "Kofi Acheampong", role: "Chief Data Officer" },
  { avatar: LeaderPriya, name: "Priya Nair", role: "VP of Product" },
];

const aboutStats = [
  { value: "2018", label: "Founded" },
  { value: "180+", label: "Employees" },
  { value: "30+", label: "Countries" },
  { value: "$42M", label: "ARR" },
];

const faqs = [
  {
    q: "What is EDABIP?",
    a: "EDABIP is an Enterprise Data Analytics and Business Intelligence Platform that helps organizations integrate, analyze, visualize, and manage data from multiple business systems in one centralized environment.",
  },
  {
    q: "Which data sources can EDABIP connect to?",
    a: "EDABIP supports integration with ERP systems, CRM platforms, HRMS applications, databases, cloud storage, APIs, spreadsheets, and other enterprise data sources.",
  },
  {
    q: "Does EDABIP support Power BI and Tableau?",
    a: "Yes. EDABIP seamlessly integrates with Power BI, Tableau, and other analytics tools to create interactive dashboards and advanced reports.",
  },
  {
    q: "Can I build custom dashboards?",
    a: "Absolutely. Users can create customized dashboards tailored to their business KPIs, departments, and reporting requirements.",
  },
  {
    q: "Is there a limit to data volume?",
    a: "Our cloud-native architecture is built for petabyte-scale analysis. We offer flexible scaling that grows with your data requirements.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. EDABIP includes enterprise-grade security features such as role-based access control, audit logs, data encryption, and governance policies.",
  },
  {
    q: "Can EDABIP support large enterprises?",
    a: "Yes. The platform is designed with scalable architecture capable of handling large datasets, multiple users, and enterprise-level workloads.",
  },
  {
    q: "Does EDABIP offer predictive analytics?",
    a: "Yes. EDABIP includes AI-powered analytics and forecasting capabilities to help businesses predict trends, demand, revenue, and potential risks.",
  },
  {
    q: "How long does implementation take?",
    a: "Implementation timelines vary depending on project complexity, integrations, and customization requirements. Our team works closely with clients to ensure a smooth deployment process.",
  },
  {
    q: "What support options are available?",
    a: "EDABIP provides email support, live assistance, technical consultation, onboarding guidance, and dedicated enterprise support plans.",
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
  const viewportAnchorRef = useRef({ element: null, top: 0 });
  const [openFaqIndex, setOpenFaqIndex] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const getPageSections = () => Array.from(document.querySelectorAll(".landing-page > section, .landing-page > footer"));
    const rememberVisibleSection = () => {
      const sections = getPageSections();
      if (!sections.length) return;
      const viewportTarget = window.innerHeight * 0.35;
      let closestSection = sections[0];
      let closestDistance = Number.POSITIVE_INFINITY;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTarget = Math.min(Math.max(viewportTarget, rect.top), rect.bottom);
        const distance = Math.abs(sectionTarget - viewportTarget);
        if (distance < closestDistance) { closestDistance = distance; closestSection = section; }
      });
      viewportAnchorRef.current = { element: closestSection, top: closestSection.getBoundingClientRect().top };
    };
    let resizeFrame = 0;
    const keepSectionInPlace = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        const { element, top } = viewportAnchorRef.current;
        if (!element || !document.body.contains(element)) { rememberVisibleSection(); return; }
        const newTop = element.getBoundingClientRect().top;
        const shift = newTop - top;
        if (Math.abs(shift) > 1) window.scrollBy({ top: shift, left: 0, behavior: "auto" });
      });
    };
    rememberVisibleSection();
    window.addEventListener("scroll", rememberVisibleSection, { passive: true });
    window.addEventListener("resize", keepSectionInPlace, { passive: true });
    return () => {
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("scroll", rememberVisibleSection);
      window.removeEventListener("resize", keepSectionInPlace);
    };
  }, []);

  const [contactForm, setContactForm] = useState({
  fullName: "",
  workEmail: "",
  companyName: "",
  industry: "",
  message: "",
});

const [contactErrors, setContactErrors] = useState({});
const [isSubmittingContact, setIsSubmittingContact] = useState(false);

const handleContactChange = (event) => {
  const { name, value } = event.target;

  setContactForm((current) => ({
    ...current,
    [name]: value,
  }));

  if (contactErrors[name]) {
    setContactErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }
};

const validateContactForm = () => {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!contactForm.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!contactForm.workEmail.trim()) {
    errors.workEmail = "Work email is required.";
  } else if (!emailPattern.test(contactForm.workEmail)) {
    errors.workEmail = "Enter a valid email address.";
  }

  if (!contactForm.companyName.trim()) {
    errors.companyName = "Company name is required.";
  }

  if (!contactForm.industry) {
    errors.industry = "Select an industry.";
  }

  if (!contactForm.message.trim()) {
    errors.message = "Message is required.";
  } else if (contactForm.message.trim().length < 10) {
    errors.message = "Message must contain at least 10 characters.";
  }

  return errors;
};

const handleContactSubmit = async (event) => {
  event.preventDefault();

  const errors = validateContactForm();
  setContactErrors(errors);

  if (Object.keys(errors).length > 0) {
    return;
  }

  setIsSubmittingContact(true);

  try {
    // Replace this with the real backend API when it is available.
    console.log("Contact form payload:", contactForm);
  } finally {
    setIsSubmittingContact(false);
  }
};

  return (
    <main className="landing-page">
      <header className="landing-header">
        <div className="landing-header-container">
          <a
            href="#home"
            className="landing-brand"
            aria-label="EDABIP home"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              className="landing-brand-logo"
              src={brandbadge}
              alt=""
              aria-hidden="true"
            />
            <span>EDABIP</span>
          </a>

          <button
            type="button"
            className={`landing-menu-button ${
              isMobileMenuOpen ? "landing-menu-button--open" : ""
            }`}
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="landing-navigation"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="landing-navigation"
            className={`landing-nav ${
              isMobileMenuOpen ? "landing-nav--open" : ""
            }`}
            aria-label="Main navigation"
          >
            <a
              href="#home"
              className="landing-nav-link landing-nav-link--active"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#features"
              className="landing-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#dashboard"
              className="landing-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </a>
            <a
              href="#services"
              className="landing-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#pricing"
              className="landing-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#about"
              className="landing-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="#contact"
              className="landing-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </a>
          </nav>

          <div className="landing-header-actions">
            <Link to="/login" className="landing-login-button">
              Login
            </Link>
            <Link to="/signup" className="landing-signup-button">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <section className="hero" id="home">
        <img
          className="hero-background-image"
          src={HeroBg}
          alt=""
          aria-hidden="true"
        />
        <div className="hero-content">
          <h1>
            <span className="hero-title-main">Transform Enterprise Data</span>
            <span className="hero-title-accent">into Actionable</span>
          </h1>
          <div className="hero-bullets">
            {["Real-Time KPI Monitoring", "AI-Powered Business Insights", "Advanced Analytics & Reporting"].map((text) => (
              <div key={text} className="hero-bullet">
                <img src={HeroCheck} alt="" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <button type="button" className="primary-btn hero-explore-btn">Explore Platform</button>
        </div>
        <div className="hero-panels">
          <article className="hero-panel hero-panel-large">
            <img src={Widget1} alt="Executive analytics report" className="panel-widget" />
            <div className="hero-panel-copy">
              <h4>Executive Analytics</h4>
              <p>Gain complete visibility into business performance</p>
            </div>
          </article>
          <article className="hero-panel hero-panel-medium">
            <img src={Widget2} alt="AI predictive intelligence" className="panel-widget" />
            <div className="hero-panel-copy">
              <h4>AI Predictive Intelligence</h4>
              <p>Predict revenue, customer behavior</p>
            </div>
          </article>
          <article className="hero-panel hero-panel-small">
            <img src={Widget3} alt="Revenue performance" className="panel-widget" />
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
        <p>Join hundreds of leading organizations that trust EDABIP to power their data-driven decisions.</p>
        <div className="trusted-strip">
          {trustedLogos.map((logo, index) => <div key={index} className="trusted-logo"><img src={logo.img} alt={logo.name} /></div>)}
        </div>
        <img src={TrustedBottomPattern} alt="" className="trusted-bottom-img" />
      </section>

      <section className="why-edabip" aria-labelledby="why-edabip-title">
        <img
          className="why-edabip-bg"
          src={WhyEdabipBg}
          alt=""
          aria-hidden="true"
        />

        <div className="why-edabip-container">
          <header className="why-edabip-header">
            <span className="why-edabip-eyebrow">WHY EDABIP</span>

            <h2 id="why-edabip-title">
              Built for Enterprises That Can't Afford
              <span>Guesswork</span>
            </h2>

            <p>
              EDABIP combines the power of AI, real-time data pipelines, and
              enterprise-grade infrastructure in one unified platform.
            </p>
          </header>

          <div className="why-edabip-grid">
            {whyEdabipCards.map((card) => (
              <article className="why-edabip-card" key={card.id}>
                <div className="why-edabip-icon-wrap" aria-hidden="true">
                  <img
                    className="why-edabip-icon"
                    src={card.icon}
                    alt=""
                  />
                </div>

                <div className="why-edabip-card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="platform-features"
        id="features"
        aria-labelledby="platform-features-title"
      >
        <div className="platform-features-container">
          <header className="platform-features-header">
            <span className="platform-features-badge">
              PLATFORM FEATURES
            </span>

            <h2 id="platform-features-title">
              Everything You Need to Govern, Analyze &amp; Act on Data
            </h2>
          </header>

          <div className="platform-features-list">
            {platformFeatures.map((feature, index) => (
              <article
                key={feature.id}
                className={`platform-feature-row ${
                  index % 2 !== 0 ? "platform-feature-row--reverse" : ""
                }`}
              >
                <div className="platform-feature-copy">
                  <span className="platform-feature-eyebrow">
                    {feature.eyebrow}
                  </span>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>

                  <ul className="platform-feature-points">
                    {feature.points.map((point) => (
                      <li key={point}>
                        <img
                          className="platform-feature-check-icon"
                          src={HeroCheck1}
                          alt=""
                          aria-hidden="true"
                        />

                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="platform-feature-visual">
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-showcase" id="dashboard">
        <img className="dash-bg dash-left" src={DashboardBGLeft} alt="" />
        <img className="dash-bg dash-right" src={DashboardBGRight} alt="" />
        <div className="section-title">
          <small>DASHBOARD SHOWCASE</small>
          <h2>POWERFUL DASHBOARD FOR <span>EVERY DECISION</span></h2>
        </div>
        <div className="dashboard-grid">
          {dashboardCards.map((card, index) => (
            <article key={index} className="dashboard-card">
              <div className="dash-thumb"><img src={card.thumb} alt={card.title} /></div>
              <div className="dashboard-copy">
                <div className="dash-icon"><img src={card.icon} alt="" /></div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <a href="#!" className="dash-view-link">
                  View Dashboard <img src={ArrowIcon} alt="" className="dash-view-arrow" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <button type="button" className="primary-btn dashboard-explore-btn">
          Explore All Dashboard
        </button>
      </section>

      

      <section className="platform-overview">
        <img className="trusted-bg platform-overview-left" src={PlatformOverviewleft} alt="" />
        <img className="trusted-bg platform-overview-right" src={PlatformOverviewright} alt="" />
        <div className="section-title">
          <small>PLATFORM OVERVIEW</small>
          <h2>One Platform<span className="title-dot"></span> <span>Unlimited Insights<span className="title-dot"></span></span></h2>
        </div>
        <img className="platform-overview-center" src={PlatformOverviewCenter} alt="" />
        <div className="platform-grid">
          {platformCards.map((card, index) => (
            <article key={index} className="platform-card">
              <div className="platform-icon"><img src={card.icon} alt={card.title} /></div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <img className="platform-card-illustration" src={card.illustration} alt="" />
            </article>
          ))}
        </div>
      </section>


      <section
        className="services-section"
        id="services"
        aria-labelledby="services-title"
      >
        <div className="services-container">
          <header className="services-header">
            <span className="services-badge">SERVICES</span>

            <h2 id="services-title">
              Expert Support From Day One to Scale
            </h2>

            <p>
              We don't just sell software, we partner with your team to design,
              build, and operate your entire data stack.
            </p>
          </header>

          <div className="services-grid">
            {servicesCards.map((service) => (
              <article className="services-card" key={service.id}>
                <div className="services-icon-wrap" aria-hidden="true">
                  <img
                    className="services-icon"
                    src={service.icon}
                    alt=""
                  />
                </div>

                <h3>{service.title}</h3>

                <p className="services-description">
                  {service.description}
                </p>

                <ul className="services-points">
                  {service.points.map((point) => (
                    <li key={point}>
                      <img
                        src={ServiceCheck}
                        alt=""
                        aria-hidden="true"
                        className="services-check-icon"
                      />

                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
  className="how-it-works"
  aria-labelledby="how-it-works-title"
>
  <div className="how-it-works-container">
    <header className="how-it-works-header">
      <span className="how-it-works-badge">
        HOW IT WORKS
      </span>

      <h2 id="how-it-works-title">
        From Raw Data to Business Decisions in 4 Steps
      </h2>
    </header>

    <div className="how-it-works-process">
      <div
        className="how-it-works-line"
        aria-hidden="true"
      />

      {howSteps.map((step) => (
        <article
          className="how-it-works-step"
          key={step.id}
        >
          <div className="how-it-works-icon-wrap">
            <img
              className="how-it-works-icon"
              src={step.icon}
              alt=""
              aria-hidden="true"
            />
          </div>

          <span className="how-it-works-number">
            {step.no}
          </span>

          <h3>{step.title}</h3>

          <p>{step.text}</p>
        </article>
      ))}
    </div>
  </div>
</section>

      <section
        className="industries-section"
        aria-labelledby="industries-title"
      >
        <div className="industries-container">
          <header className="industries-header">
            <span className="industries-badge">
              INDUSTRIES
            </span>

            <h2 id="industries-title">
              Industries <span className="indsutries-title-accent">We Serve</span>
            </h2>
          </header>

          <div className="industries-grid">
            {industries.map((industry) => (
              <article
                className="industry-card"
                key={industry.id}
                style={{ "--industry-accent": industry.accent }}
              >
                <div className="industry-icon-wrap">
                  <img
                    className="industry-icon"
                    src={industry.icon}
                    alt=""
                    aria-hidden="true"
                  />
                </div>

                <h3>{industry.title}</h3>

                <span
                  className="industry-card-accent"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="pricing-section"
        id="pricing"
        aria-labelledby="pricing-title"
      >
        <div className="pricing-container">
          <header className="pricing-header">
            <span className="pricing-badge">
              PRICING
            </span>

            <h2 id="pricing-title">
              Transparent Pricing. <span>No Hidden Fees.</span>
            </h2>

            <p>
              Start with a 14-day free trial on any plan. No credit card required.
            </p>
          </header>

          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <article
                key={plan.id}
                className={`pricing-card ${
                  plan.featured ? "pricing-card--featured" : ""
                }`}
              >
                {plan.featured && (
                  <span className="pricing-popular">
                    Most Popular
                  </span>
                )}

                <span className="pricing-plan-name">
                  {plan.name}
                </span>

                <div className="pricing-price-row">
                  <span className="pricing-price">
                    {plan.price}
                  </span>

                  {plan.period && (
                    <span className="pricing-period">
                      {plan.period}
                    </span>
                  )}
                </div>

                <p className="pricing-description">
                  {plan.description}
                </p>

                <ul className="pricing-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <img
                        src={ServiceCheck}
                        alt=""
                        aria-hidden="true"
                        className="pricing-check"
                      />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="pricing-button"
                >
                  Get Started
                </button>
              </article>
            ))}
          </div>

          <p className="pricing-note">
            Not satisfied with EDABIP? If our platform doesn't meet your expectations,
            you can request a full refund within 30 days of purchase.
            <span>No hidden fees, no complicated process.</span>
          </p>
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-copy">
              <span className="about-badge">ABOUT EDABIP</span>
              <h2 id="about-title">
                We Believe Every Decision Should Be Backed by Data
              </h2>
              <p>
                EDABIP was founded in 2018 by a team of data engineers and business
                intelligence veterans who were frustrated by the fragmentation of
                enterprise data tooling. Too many tools, too little integration,
                too much wasted potential.
              </p>
              <p>
                Today, EDABIP is the unified analytics platform trusted by 200+
                enterprises across 30 countries. Our mission is simple: turn every
                organization into a data-driven powerhouse — regardless of size or
                technical maturity.
              </p>

              <div className="about-mission-vision">
                <div className="about-mv-item">
                  <h4>Our Mission</h4>
                  <p>Democratize enterprise-grade analytics for every team.</p>
                </div>
                <div className="about-mv-item about-mv-item--vision">
                  <h4>Our Vision</h4>
                  <p>A world where data powers every business decision.</p>
                </div>
              </div>
            </div>

            <div className="about-stats-grid">
              {aboutStats.map((stat) => (
                <div className="about-stat-card" key={stat.label}>
                  <span className="about-stat-value">{stat.value}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-leadership">
            <h3 className="about-leadership-title">Leadership Team</h3>
            <div className="about-leadership-grid">
              {leaders.map((lead, index) => (
                <article key={index} className="about-leader-card">
                  <img className="about-leader-avatar" src={lead.avatar} alt={lead.name} />
                  <h4>{lead.name}</h4>
                  <p>{lead.role}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="reviews-section"
        aria-labelledby="reviews-title"
      >
        <div className="reviews-container">
          <header className="reviews-header">
            <span className="reviews-badge">
              CUSTOMER REVIEWS
            </span>
            <h2 id="reviews-title">
              Trusted by Data Leaders Worldwide
            </h2>
            <p>
              Join 200+ enterprises who use EDABIP to power their data strategy.
            </p>
          </header>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <article
                className="review-card"
                key={review.name}
              >
                <img
                  src={StarsRow}
                  className="review-stars"
                  alt="5 star rating"
                />
                <blockquote>
                  "{review.quote}"
                </blockquote>
                <div className="review-person">
                  <img
                    src={review.avatar}
                    alt={review.name}
                  />
                  <div>
                    <h3>{review.name}</h3>
                    <span>
                      {review.role}, {review.company}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      <section className="faq-section" aria-labelledby="faq-title">
        <div className="faq-container">
          <header className="faq-header">
            <span className="faq-badge">FAQ</span>
            <h2 id="faq-title">
              Frequently Asked <span>Questions</span>
            </h2>
            <p>
              Everything you need to know about EDABIP and how it helps
              organizations transform data into actionable intelligence.
            </p>
          </header>

          <div className="faq-list">
            {faqs.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={item.q}
                  className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                >
                  <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenFaqIndex(isOpen ? null : index)
                  }
                >
                  <span>
                    <strong>Q{index + 1}.</strong> {item.q}
                  </span>
                  <img
                    src={FaqChevron}
                    alt=""
                    aria-hidden="true"
                    className="faq-chevron"
                  />
                </button>

                  {isOpen && <p className="faq-answer">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      

      <section className="stats-strip">
        {stats.map((item, index) => (
          <article key={index} className="stat-item">
            <div className="stat-dot"><img src={item.icon} alt="" /></div>
            <div><h3>{item.value}</h3><p>{item.label}</p></div>
          </article>
        ))}
      </section>

      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="contact-container">
          <header className="contact-header">
            <span className="contact-badge">
              GET IN TOUCH
            </span>

            <h2 id="contact-title">
              Let's Talk About Your Data Strategy
            </h2>

            <p>
              Have a question or ready to get started? Our team typically responds
              within 2 business hours.
            </p>
          </header>

          <div className="contact-layout">
            <aside
              className="contact-information-card"
              aria-labelledby="contact-information-title"
            >
              <h3 id="contact-information-title">
                Contact Information
              </h3>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <span className="contact-detail-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M3.75 6.75h16.5v10.5H3.75z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m4.5 7.5 7.5 5.25 7.5-5.25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <div>
                    <span className="contact-detail-label">EMAIL US</span>

                    <a href="mailto:solutions@edabip.com">
                      solutions@edabip.com
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <span className="contact-detail-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M7.3 4.5 9.8 8l-1.5 2.2a14.8 14.8 0 0 0 5.5 5.5l2.2-1.5 3.5 2.5-.8 3a2 2 0 0 1-2 1.5C9.6 20.4 3.6 14.4 2.8 7.3a2 2 0 0 1 1.5-2z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <div>
                    <span className="contact-detail-label">CALL US</span>

                    <a href="tel:+18003322477">
                      +1 (800) 332-2477
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <span className="contact-detail-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </span>

                  <div>
                    <span className="contact-detail-label">VISIT US</span>

                    <address>
                      100 Innovation Way, San Francisco, CA
                    </address>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <span className="contact-detail-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M12 7.5v5l3 2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <div>
                    <span className="contact-detail-label">WORKING HOURS</span>

                    <p>
                      Mon–Fri, 9:00 AM – 6:00 PM EST
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-demo-card">
                <h4>Prefer a live walkthrough?</h4>

                <p>
                  Schedule a 30-minute personalized demo with one of our analytics
                  engineers.
                </p>

                <button
                  type="button"
                  className="contact-demo-button"
                >
                  Book a Demo
                </button>
              </div>
            </aside>

            <form
              className="contact-form-card"
              onSubmit={handleContactSubmit}
              noValidate
            >
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-full-name">
                    Full Name
                  </label>

                  <input
                    id="contact-full-name"
                    name="fullName"
                    type="text"
                    value={contactForm.fullName}
                    onChange={handleContactChange}
                    placeholder="John Doe"
                    autoComplete="name"
                    aria-invalid={Boolean(contactErrors.fullName)}
                    aria-describedby={
                      contactErrors.fullName
                        ? "contact-full-name-error"
                        : undefined
                    }
                  />

                  {contactErrors.fullName && (
                    <span
                      id="contact-full-name-error"
                      className="contact-field-error"
                    >
                      {contactErrors.fullName}
                    </span>
                  )}
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-work-email">
                    Work Email
                  </label>

                  <input
                    id="contact-work-email"
                    name="workEmail"
                    type="email"
                    value={contactForm.workEmail}
                    onChange={handleContactChange}
                    placeholder="john@company.com"
                    autoComplete="email"
                    aria-invalid={Boolean(contactErrors.workEmail)}
                    aria-describedby={
                      contactErrors.workEmail
                        ? "contact-work-email-error"
                        : undefined
                    }
                  />

                  {contactErrors.workEmail && (
                    <span
                      id="contact-work-email-error"
                      className="contact-field-error"
                    >
                      {contactErrors.workEmail}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-company-name">
                  Company Name
                </label>

                <input
                  id="contact-company-name"
                  name="companyName"
                  type="text"
                  value={contactForm.companyName}
                  onChange={handleContactChange}
                  placeholder="Enterprise Inc."
                  autoComplete="organization"
                  aria-invalid={Boolean(contactErrors.companyName)}
                  aria-describedby={
                    contactErrors.companyName
                      ? "contact-company-name-error"
                      : undefined
                  }
                />

                {contactErrors.companyName && (
                  <span
                    id="contact-company-name-error"
                    className="contact-field-error"
                  >
                    {contactErrors.companyName}
                  </span>
                )}
              </div>

              <div className="contact-field">
                <label htmlFor="contact-industry">
                  Industry
                </label>

                <select
                  id="contact-industry"
                  name="industry"
                  value={contactForm.industry}
                  onChange={handleContactChange}
                  aria-invalid={Boolean(contactErrors.industry)}
                  aria-describedby={
                    contactErrors.industry
                      ? "contact-industry-error"
                      : undefined
                  }
                >
                  <option value="">
                    Search your industry
                  </option>

                  {industries.map((industry) => (
                    <option
                      key={industry.id}
                      value={industry.id}
                    >
                      {industry.title}
                    </option>
                  ))}
                </select>

                {contactErrors.industry && (
                  <span
                    id="contact-industry-error"
                    className="contact-field-error"
                  >
                    {contactErrors.industry}
                  </span>
                )}
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="How can we help you?"
                  rows="5"
                  aria-invalid={Boolean(contactErrors.message)}
                  aria-describedby={
                    contactErrors.message
                      ? "contact-message-error"
                      : undefined
                  }
                />

                {contactErrors.message && (
                  <span
                    id="contact-message-error"
                    className="contact-field-error"
                  >
                    {contactErrors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="contact-submit-button"
                disabled={isSubmittingContact}
              >
                {isSubmittingContact
                  ? "Sending..."
                  : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section
  className="final-cta-section"
  aria-labelledby="final-cta-title"
>
  <div className="final-cta-container">
    <h2 id="final-cta-title">
      Ready To Transform Your Data
      <span>Strategy?</span>
    </h2>

    <p>
      Join the ranks of the world's most intelligent enterprises.
      Start your 14-day premium trial today.
    </p>

    <div className="final-cta-actions">
      <Link
        to="/signup"
        className="final-cta-button final-cta-button--primary"
      >
        Start Free Trial
      </Link>

      <a
        href="#contact"
        className="final-cta-button final-cta-button--secondary"
      >
        Schedule a Demo
      </a>
    </div>
  </div>
</section>

<footer className="landing-footer">
  <div className="landing-footer-container">
    <div className="footer-main">
      <div className="footer-brand">
        <a
          href="#home"
          className="footer-brand-logo"
          aria-label="EDABIP home"
        >
          <img
            src={FooterLogoMark}
            alt=""
            aria-hidden="true"
          />

          <span>EDABIP</span>
        </a>

        <p className="footer-brand-description">
          Empowering businesses with data, analytics and AI to drive growth
          and innovation.
        </p>

        <div className="footer-socials">
          <a
            href="#!"
            className="footer-social-link"
            aria-label="EDABIP on X"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M18.2 3H21l-6.1 7 7.1 11h-5.6l-4.4-6.8L6 21H3.2l6.5-7.5L2.9 3h5.7l4 6.2L18.2 3Zm-1 16h1.5L7.7 4.9H6.1L17.2 19Z"
                fill="currentColor"
              />
            </svg>
          </a>

          <a
            href="#!"
            className="footer-social-link"
            aria-label="EDABIP on LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6.5 8.3H3.3V20h3.2V8.3ZM4.9 3A1.9 1.9 0 1 0 5 6.8 1.9 1.9 0 0 0 4.9 3ZM20.7 13.3c0-3.5-1.9-5.2-4.4-5.2-2 0-2.9 1.1-3.4 1.9V8.3H9.7V20H13v-5.8c0-1.5.3-3 2.2-3 1.8 0 1.9 1.7 1.9 3.1V20h3.2l.4-6.7Z"
                fill="currentColor"
              />
            </svg>
          </a>

          <a
            href="#!"
            className="footer-social-link"
            aria-label="EDABIP on YouTube"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M21.6 7.1a2.8 2.8 0 0 0-2-2C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.9 2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.9ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z"
                fill="currentColor"
              />
            </svg>
          </a>

          <a
            href="#!"
            className="footer-social-link"
            aria-label="EDABIP on Instagram"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="3.5"
                y="3.5"
                width="17"
                height="17"
                rx="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle
                cx="12"
                cy="12"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="17.4" cy="6.8" r="1" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>

      <nav className="footer-column" aria-label="Platform links">
        <h3>Platform</h3>

        <a href="#features">Data Integration</a>
        <a href="#features">Data Warehouse</a>
        <a href="#features">Power BI</a>
        <a href="#features">Tableau</a>
        <a href="#features">AI Analytics</a>
      </nav>

      <nav className="footer-column" aria-label="Solution links">
        <h3>Solutions</h3>

        <a href="#services">Sales Analytics</a>
        <a href="#services">Financial Analytics</a>
        <a href="#services">Operations Analytics</a>
        <a href="#services">Marketing Analytics</a>
        <a href="#services">AI Insights</a>
      </nav>

      <nav className="footer-column" aria-label="Resource links">
        <h3>Resources</h3>

        <a href="#!">Documentation</a>
        <a href="#!">Case Studies</a>
        <a href="#!">Blog</a>
        <a href="#!">Webinars</a>
        <a href="#contact">Support Center</a>
      </nav>

      <div className="footer-newsletter">
        <h3>Newsletter</h3>

        <p>
          Stay updated with the latest insights and updates.
        </p>

        <form
          className="footer-newsletter-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <label
            htmlFor="footer-newsletter-email"
            className="sr-only"
          >
            Email address
          </label>

          <input
            id="footer-newsletter-email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
          />

          <button
            type="submit"
            aria-label="Subscribe to newsletter"
          >
            →
          </button>
        </form>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2026 EDABIP. All rights reserved.</p>

      <div className="footer-legal-links">
        <a href="#!">Privacy Policy</a>
        <a href="#!">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>

    </main>
  );
}
