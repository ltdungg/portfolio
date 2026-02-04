import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Server, 
  Code2, 
  Cloud, 
  Cpu, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink, 
  X, 
  ChevronRight,
  Layers,
  Terminal as TerminalIcon,
  BarChart3,
  GitBranch,
  Award,
  BookOpen,
  Activity,
  Zap,
  Coffee,
  Globe,
  User,
  Heart,
  Lightbulb,
  MapPin,
  Calendar,
  Trophy,
  Star,
  CheckCircle2,
  TrendingUp,
  Box,
  Workflow,
  ShieldCheck,
  Search,
  Settings
} from 'lucide-react';

// --- ENRICHED DATA STRUCTURE ---
const ABOUT_ME = {
  name: "Luong Tien Dung",
  role: "Aspiring Data Engineer",
  location: "Viet Hung, Ha Noi",
  bio: "Aspiring Data Engineer with a strong command of Advanced SQL and Python. Hands-on experience in building scalable ETL/ELT pipelines and Data Lakehouse architectures using Microsoft Fabric, AWS, and Apache Spark.",
  story: "My journey in tech began at the University of Transport and Communication, where I maintained a high GPA of 3.26/4.0 and discovered a deep fascination for data architecture. Through my internship at KPIM and leadership roles in technical clubs, I have evolved into an engineer who values data integrity and architectural efficiency above all else.",
  principles: [
    { title: "Scalability", desc: "Building pipelines that handle growth effortlessly.", icon: <Zap className="w-4 h-4" /> },
    { title: "Data Quality", desc: "Ensuring 99.8% accuracy through automated validation.", icon: <Activity className="w-4 h-4" /> },
    { title: "Automation", desc: "Orchestrating complex workflows with Airflow & Fabric.", icon: <Cpu className="w-4 h-4" /> }
  ],
  hobbies: ["Badminton", "Pickleball", "Open Source", "Tech Workshops"]
};

const SKILLS_CATEGORIES = [
  {
    title: "Programming & Logic",
    icon: <Code2 className="w-6 h-6 text-indigo-400" />,
    skills: [
      "Python (Pandas, PySpark, FastAPI)", 
      "SQL (T-SQL, PL/pgSQL, Advanced Joins)", 
      "Bash/Shell Scripting", 
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)"
    ]
  },
  {
    title: "Data Engineering & ETL",
    icon: <Cpu className="w-6 h-6 text-emerald-400" />,
    skills: [
      "Apache Spark (Batch & Streaming)", 
      "Microsoft Fabric (Lakehouse/Warehouse)", 
      "Apache Airflow (DAGs, Scheduling)", 
      "Azure Data Factory (ADF)",
      "dbt (Data Transformation)",
      "Medallion Architecture Design"
    ]
  },
  {
    title: "Cloud & Infrastructure",
    icon: <Cloud className="w-6 h-6 text-sky-400" />,
    skills: [
      "AWS (Glue, Lambda, Kinesis, Redshift)", 
      "Docker (Containerization)", 
      "Git / CI/CD Pipelines", 
      "Serverless Compute Optimization",
      "Terraform (IaC Basics)"
    ]
  },
  {
    title: "Storage & Databases",
    icon: <Database className="w-6 h-6 text-rose-400" />,
    skills: [
      "PostgreSQL / SQL Server", 
      "MinIO / AWS S3 (Object Storage)", 
      "DynamoDB (NoSQL)", 
      "Delta Lake / Parquet Formats",
      "Vector Databases (Basics)"
    ]
  }
];

const STATS = [
  { label: 'GPA (IT)', value: '3.26/4.0', icon: <BookOpen className="w-5 h-5 text-indigo-400" /> },
  { label: 'Data Accuracy', value: '99.8%', icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
  { label: 'Processing Gain', value: '3x Faster', icon: <Activity className="w-5 h-5 text-rose-400" /> },
  { label: 'Resource Saved', value: '40%', icon: <Zap className="w-5 h-5 text-amber-400" /> }
];

const PROJECTS = [
  {
    id: 1,
    title: "Enterprise Data Lakehouse Migration",
    category: "Corporate - KPIM",
    projectIcon: <Server className="w-12 h-12" />,
    shortDesc: "End-to-end migration of legacy ERP/CRM systems to a centralized Microsoft Fabric Lakehouse.",
    longDesc: "This project focused on modernizing legacy on-premise reporting systems for financial data. By migrating from full-load processing to an incremental ingestion strategy, we resolved significant bottleneck issues. I implemented the Medallion Architecture (Bronze -> Silver -> Gold layers) to ensure data was cleaned, validated, and optimized for business intelligence. Automated validation constraints were integrated to ensure high referential integrity across complex NetSuite ERP datasets.",
    details: [
      "Engineered incremental data ingestion pipelines in Microsoft Fabric using Notebooks and PySpark.",
      "Developed custom Python scripts for automated data quality checks (Null checks, Type validation).",
      "Organized data into 3 distinct layers to separate raw ingestion from curated data marts.",
      "Reduced daily processing windows by ~65%, significantly improving report availability for stakeholders."
    ],
    architecture: "NetSuite ERP -> Microsoft Fabric (Shortcuts/Pipelines) -> Delta Lake Layers -> SQL Analytics Endpoint",
    challenge: "Handling large-scale NetSuite datasets with complex relationships while maintaining minimal compute costs.",
    tech: ["Microsoft Fabric", "PySpark", "SQL", "Delta Lake", "Lakehouse"],
  },
  {
    id: 2,
    title: "AWS Hybrid E-commerce Pipeline",
    category: "Cloud Architecture",
    projectIcon: <Workflow className="w-12 h-12" />,
    shortDesc: "Lambda Architecture supporting real-time recommendations and historical analytics.",
    longDesc: "Designed a comprehensive data ecosystem on AWS to handle high-velocity e-commerce events. The 'Hot Path' utilized AWS Kinesis and Lambda to provide sub-second product recommendations based on user clickstreams. The 'Cold Path' used AWS Glue for batch ETL processing, aggregating transactional records from RDS to S3 and eventually Redshift for long-term historical trend analysis. This hybrid approach ensures the business stays reactive to immediate user behavior while maintaining a deep historical database.",
    details: [
      "Implemented AWS Kinesis Data Streams for real-time ingestion of 10k+ events/sec.",
      "Configured AWS Lambda for real-time feature extraction and sub-second serving.",
      "Automated serverless Spark jobs via AWS Glue for daily transactional aggregation.",
      "Managed partitioned data storage in S3 (Parquet) to optimize query performance in Redshift."
    ],
    architecture: "Clickstream -> Kinesis -> Lambda -> DynamoDB (Hot) | Transactions -> Glue -> S3 -> Redshift (Cold)",
    challenge: "Synchronizing real-time event schemas with batch processing schemas to ensure consistency across reports.",
    tech: ["AWS Glue", "Kinesis", "Lambda", "Redshift", "DynamoDB", "S3"],
  },
  {
    id: 3,
    title: "Investor AI - Stock Analysis Platform",
    category: "Scientific Research",
    projectIcon: <TrendingUp className="w-12 h-12" />,
    shortDesc: "Microservices-based platform for automated stock ingestion and AI-driven insights.",
    longDesc: "Led a team of 5 to develop a distributed system for financial analysis. The core responsibility included defining the system data architecture and managing the orchestration layer. We utilized Python crawlers to fetch daily market data from various APIs, which was then orchestrated via Apache Airflow. Data transformation was performed using Apache Spark to handle incremental loads efficiently. The system featured a dual-storage strategy: MinIO for large-scale raw/processed files used in ML training, and PostgreSQL for structured data serving the frontend application.",
    details: [
      "Containerized Frontend, Backend, and Data tools using Docker Compose for seamless deployment.",
      "Designed Airflow DAGs to manage complex dependencies between data fetching and Spark transformation.",
      "Applied incremental loading strategies in Spark to reduce daily update compute time by 50%.",
      "Architected dual-storage (Object Storage + RDBMS) to satisfy both ML and BI requirements."
    ],
    architecture: "External APIs -> Airflow (Python Crawler) -> Spark ETL -> MinIO & PostgreSQL",
    challenge: "Managing task delegation and ensuring cross-service communication in a containerized environment.",
    tech: ["Apache Spark", "Airflow", "Docker", "MinIO", "PostgreSQL", "ReactJS"],
  }
];

const CERTIFICATIONS = [
  { name: "SQL Advanced Certificate", issuer: "Hackerrank", date: "2024" },
  { name: "Data Engineer Associate", issuer: "Datacamp", date: "2024" }
];

const AWARDS = [
  { name: "1st Place - UTC Scientific Research", issuer: "University of Transport & Communication", date: "2024-2025", desc: "Awarded for the Investor AI Stock Analysis Platform project." },
  { name: "4th Place - UTC Programming Olympic", issuer: "University of Transport & Communication", date: "2024", desc: "First round winner among IT students." }
];

const EXPERIENCE = [
  {
    company: "KPIM | Ha Noi, Viet Nam",
    role: "Data Engineer Intern",
    period: "Jun 2025 - Sep 2025",
    points: [
      "Collaborated with the DE team to migrate legacy on-premise systems to Microsoft Fabric.",
      "Integrated automated data quality checks (SQL/Python) achieving 99.8% accuracy.",
      "Optimized ETL pipelines reducing compute consumption by 40%."
    ]
  },
  {
    company: "UTC Informatics Club",
    role: "Head of Data & AI",
    period: "Feb 2025 - Present",
    points: [
      "Spearheaded data workshops and live-coding sessions for 100+ members.",
      "Mentored teams during AI Hackathons on data lifecycle management and Docker deployment."
    ]
  }
];

// --- TERMINAL COMPONENT ---
const Terminal = () => {
  const [lines, setLines] = useState([
    "Initializating Dzung_Luong.env...",
    "System: UTC Information Technology",
    "Status: Data Lakehouse Connected",
    "Loading Spark_Context... OK",
    "> whoami"
  ]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-mono text-xs md:text-sm">
      <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
      </div>
      <div className="p-4 space-y-1">
        {lines.map((line, i) => (
          <div key={i} className={i === lines.length - 1 ? "text-emerald-400" : "text-slate-400"}>
            <span className="text-indigo-400 mr-2">$</span> {line}
          </div>
        ))}
        <div className="text-white flex">
          <span className="text-indigo-400 mr-2">$</span>
          <span className="text-white font-bold ml-1">Lương Tiến Dũng</span>
          <span className="w-2 h-5 bg-white animate-pulse ml-1"></span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-600/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-emerald-400 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg">D</div>
            <span className="text-lg font-bold tracking-tighter uppercase ml-2">Dzung.Data</span>
          </div>
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            {['Story', 'Skills', 'Work', 'Awards'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-emerald-400 transition-colors">{item}</a>
            ))}
          </div>
          <a href="mailto:luongtiendung.work@gmail.com" className="px-6 py-2.5 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition-all shadow-xl active:scale-95">
            LET'S CONNECT
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-40 md:pt-56 pb-20 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-24">
            <div className="lg:col-span-8 p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-indigo-500/10 via-slate-900/40 to-transparent border border-white/10 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-colors"></div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black tracking-[0.2em] text-emerald-400 mb-10 w-fit uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Data Engineer Intern @ KPIM
              </div>
              <h1 className="text-5xl md:text-[92px] font-bold mb-10 tracking-tighter leading-[0.85]">
                Engineering <br />
                <span className="bg-gradient-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent">Robust Pipelines</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-xl mb-12 leading-relaxed font-light">
                {ABOUT_ME.bio}
              </p>
              <div className="flex flex-wrap gap-5">
                <a href="#work" className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500 transition-all flex items-center gap-3 group/btn shadow-xl shadow-emerald-600/20 active:scale-95">
                  VIEW CASE STUDIES <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <div className="flex gap-3">
                  <a href="https://github.com/ltdungg" target="_blank" className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com/in/dzung-luong" target="_blank" className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-8">
              <Terminal />
              <div className="flex-grow p-10 rounded-[3rem] bg-slate-900/40 border border-white/10 backdrop-blur-md flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-emerald-400">
                    <MapPin className="w-6 h-6" />
                    <span className="text-sm font-bold tracking-tight">{ABOUT_ME.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-indigo-400">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-sm font-bold tracking-tight">GPA: 3.26/4.00</span>
                  </div>
                </div>
                <div className="mt-12">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Expertise Focus</div>
                  <div className="flex flex-wrap gap-3">
                    {['Spark', 'MS Fabric', 'AWS', 'Docker', 'Airflow'].map(tag => (
                      <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[11px] font-bold">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills - Expanded & More Detailed */}
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-emerald-500 font-black text-xs tracking-[0.4em] uppercase mb-4">Mastering the Lifecycle</div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">Detailed Tech Stack.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SKILLS_CATEGORIES.map((cat, i) => (
              <div key={i} className="p-10 rounded-[3.5rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  {cat.icon}
                </div>
                <div>
                  <div className="mb-8 p-4 bg-white/5 w-fit rounded-2xl border border-white/5 shadow-inner">
                    {cat.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-8 tracking-tight">{cat.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    {cat.skills.map(skill => (
                      <div key={skill} className="flex items-center gap-3 group/skill">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500/60 group-hover/skill:text-emerald-500 transition-colors" />
                        <span className="text-sm font-medium text-slate-400 group-hover/skill:text-white transition-colors">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-12 h-1 w-full bg-gradient-to-r from-emerald-500/20 to-transparent rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-1/2 group-hover:w-full transition-all duration-1000"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
               {STATS.map((stat, i) => (
                 <div key={i} className="p-8 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-center items-center text-center group hover:bg-emerald-500/20 transition-all">
                    <div className="mb-3">{stat.icon}</div>
                    <div className="text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </div>
        </section>

        {/* Identity & Story Section */}
        <section id="story" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 p-12 md:p-16 rounded-[4rem] bg-white/5 border border-white/10 relative overflow-hidden group">
               <div className="absolute top-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <User className="w-56 h-56" />
               </div>
               <h2 className="text-4xl font-bold mb-10 flex items-center gap-4 tracking-tighter uppercase">
                  <div className="w-16 h-[2px] bg-emerald-500"></div> THE STORY
               </h2>
               <p className="text-2xl md:text-4xl font-medium leading-tight mb-10 text-white italic">
                 "In Data We Trust, In Pipelines We Engineer."
               </p>
               <div className="space-y-8 text-slate-400 leading-relaxed text-lg font-light">
                  <p>{ABOUT_ME.story}</p>
               </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-10">
               <div className="p-10 rounded-[3rem] bg-emerald-600 border border-emerald-400 flex flex-col justify-between group overflow-hidden relative shadow-2xl shadow-emerald-600/20">
                  <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-56 h-56" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-8 uppercase tracking-widest">Principles</h3>
                  <div className="space-y-8">
                    {ABOUT_ME.principles.map((p, i) => (
                      <div key={i} className="flex gap-5 items-start">
                        <div className="p-3 rounded-xl bg-white/20 text-white shadow-lg">{p.icon}</div>
                        <div>
                          <div className="font-bold text-white text-lg">{p.title}</div>
                          <div className="text-sm text-emerald-50/70">{p.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="p-10 rounded-[3rem] bg-slate-900 border border-white/10">
                  <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-widest">
                    <Heart className="w-6 h-6 text-rose-500" /> Beyond Work
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {ABOUT_ME.hobbies.map(h => (
                      <div key={h} className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all cursor-default">
                        {h}
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div>
              <div className="text-indigo-500 font-black text-xs tracking-[0.4em] uppercase mb-4">Engineering Showcase</div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Case Studies.</h2>
            </div>
            <div className="flex gap-3 p-2 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
              {['all', 'Corporate', 'Cloud Architecture', 'Award-Winning'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all uppercase ${activeTab === cat ? 'bg-white text-slate-950 shadow-xl' : 'hover:bg-white/5 text-slate-500'}`}
                >
                  {cat === 'all' ? 'All' : cat.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROJECTS.filter(p => activeTab === 'all' || p.category === activeTab).map((project) => (
              <div 
                key={project.id} 
                className="group relative rounded-[3.5rem] bg-slate-900 border border-white/5 overflow-hidden hover:border-emerald-500/40 transition-all cursor-pointer shadow-2xl flex flex-col"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors"></div>
                  <div className="text-emerald-500 group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100">
                    {project.projectIcon}
                  </div>
                  <div className="absolute top-8 right-8 z-20 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black text-emerald-400 tracking-[0.2em] uppercase">
                    {project.category}
                  </div>
                </div>
                <div className="p-12 relative z-20">
                  <h3 className="text-3xl font-bold mb-6 group-hover:text-emerald-400 transition-colors leading-[1.1]">{project.title}</h3>
                  <p className="text-slate-400 mb-10 line-clamp-2 leading-relaxed text-base font-light">{project.shortDesc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg">#{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Recognitions Section */}
        <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-4xl font-bold flex items-center gap-5 mb-16 tracking-tighter uppercase">
                <div className="w-10 h-[3px] bg-emerald-500"></div> CAREER PATH
              </h2>
              <div className="space-y-16">
                {EXPERIENCE.map((exp, i) => (
                  <div key={i} className="group relative pl-12 before:absolute before:left-0 before:top-4 before:bottom-0 before:w-[2px] before:bg-white/5">
                    <div className="absolute left-[-6px] top-4 w-3.5 h-3.5 rounded-full bg-slate-800 border-2 border-emerald-500 group-hover:bg-emerald-500 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
                    <div className="flex flex-wrap justify-between items-start mb-6 gap-5">
                      <div>
                        <h3 className="text-3xl font-bold group-hover:text-emerald-400 transition-colors tracking-tight">{exp.role}</h3>
                        <p className="text-white/60 font-black text-sm tracking-widest uppercase mt-1">{exp.company}</p>
                      </div>
                      <span className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black text-emerald-400 uppercase tracking-[0.2em]">{exp.period}</span>
                    </div>
                    <ul className="space-y-4">
                      {exp.points.map((pt, j) => (
                        <li key={j} className="flex gap-5 text-slate-400 text-lg leading-relaxed font-light">
                          <span className="text-emerald-500 mt-2 flex-shrink-0"><CheckCircle2 className="w-4 h-4" /></span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-12" id="awards">
              <div>
                <h2 className="text-4xl font-bold flex items-center gap-5 mb-16 tracking-tighter uppercase">
                   AWARDS
                </h2>
                <div className="space-y-6">
                  {AWARDS.map((award, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/20 flex gap-6 items-start group hover:bg-amber-500/10 transition-all shadow-xl">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                        <Trophy className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-lg font-bold leading-tight mb-1">{award.name}</div>
                        <div className="text-[10px] text-amber-500/60 uppercase tracking-widest font-black mb-2">{award.issuer} • {award.date}</div>
                        <p className="text-sm text-slate-500 leading-relaxed italic">{award.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-10 tracking-tighter uppercase">CERTIFICATIONS</h2>
                <div className="space-y-4">
                  {CERTIFICATIONS.map((cert, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-white/5 flex gap-6 items-center group hover:bg-white/5 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-base font-bold mb-1">{cert.name}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{cert.issuer} • {cert.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 relative z-10 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold mb-4 tracking-tighter uppercase">Dzung.Data</div>
            <p className="text-slate-500 text-sm italic font-light tracking-wide">"Designing resilient data highways for the digital era."</p>
          </div>
          <div className="flex gap-5">
            <a href="https://github.com/ltdungg" target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/10 shadow-lg">
                <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/dzung-luong" target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/10 shadow-lg">
                <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:luongtiendung.work@gmail.com" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/10 shadow-lg">
                <Mail className="w-6 h-6" />
            </a>
          </div>
          <div className="text-slate-600 text-[10px] font-black tracking-[0.4em] uppercase">
            &copy; 2024 DE_ENGINE_V5.0_ENRICHED
          </div>
        </div>
      </footer>

      {/* Expanded Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl transition-opacity" onClick={() => setSelectedProject(null)}></div>
          <div className="relative bg-slate-900 border border-white/10 rounded-[4rem] w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-[0_0_100px_rgba(0,0,0,0.6)] scrollbar-hide">
            <button className="absolute top-10 right-10 p-4 rounded-full bg-white/5 hover:bg-white/10 transition-all z-20 text-white shadow-xl" onClick={() => setSelectedProject(null)}>
              <X className="w-7 h-7" />
            </button>
            
            <div className="p-12 md:p-20">
              <div className="flex flex-wrap gap-3 mb-10">
                <span className="px-5 py-2 rounded-full bg-emerald-600 text-white text-[10px] font-black tracking-[0.2em] uppercase shadow-lg">{selectedProject.category}</span>
                {selectedProject.tech.map(t => (
                  <span key={t} className="px-5 py-2 rounded-full bg-white/5 text-slate-400 text-[10px] font-black border border-white/10 uppercase tracking-[0.2em]">{t}</span>
                ))}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                 <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 text-emerald-500 shadow-inner">
                    {selectedProject.projectIcon}
                 </div>
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9]">
                    {selectedProject.title}
                 </h2>
              </div>
              
              <div className="grid lg:grid-cols-12 gap-16">
                <div className="lg:col-span-7 space-y-12">
                  <div>
                    <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                      <BarChart3 className="w-4 h-4" /> Full Project Scope
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-xl font-light">{selectedProject.longDesc}</p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                      <Settings className="w-4 h-4" /> Implementation Details
                    </h4>
                    <ul className="space-y-6">
                      {selectedProject.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-5 text-slate-400 text-lg leading-relaxed font-light">
                          <span className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-xs text-indigo-400 flex-shrink-0">{idx + 1}</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-10">
                  <div className="p-10 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/20 shadow-inner group">
                    <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                      <Layers className="w-5 h-5" /> Data Pipeline Flow
                    </h4>
                    <div className="relative p-8 rounded-3xl bg-black/40 border border-white/5 font-mono text-xs md:text-sm text-indigo-200/70 leading-loose overflow-x-auto">
                      <div className="absolute top-4 right-4 text-emerald-500/30 group-hover:text-emerald-500 transition-colors">
                        <TerminalIcon className="w-5 h-5" />
                      </div>
                      {selectedProject.architecture}
                    </div>
                  </div>

                  <div className="p-10 rounded-[2.5rem] bg-rose-500/5 border border-rose-500/20">
                    <h4 className="text-[11px] font-black text-rose-400 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5" /> Architectural Challenge
                    </h4>
                    <p className="text-slate-300 italic text-lg font-light leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 pt-4">
                    <button className="w-full py-6 bg-white text-slate-950 rounded-2xl font-black text-xs tracking-[0.3em] hover:bg-slate-200 transition-all shadow-2xl flex items-center justify-center gap-4 uppercase">
                      GO TO REPOSITORY <ExternalLink className="w-5 h-5" />
                    </button>
                    <button className="w-full py-6 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs tracking-[0.3em] hover:bg-white/10 transition-all flex items-center justify-center gap-4 uppercase">
                      DOWNLOAD DOCS <Github className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}