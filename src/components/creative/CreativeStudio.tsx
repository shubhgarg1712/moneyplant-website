import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Download,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Copy,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Edit3,
  Check,
  ShieldCheck,
  Layers,
  Image as ImageIcon,
  BarChart3,
  PieChart,
  Info
} from 'lucide-react';
import {
  GeneratedCreative,
  PosterDimensions,
  CreativeCategory,
  CreativeStyle,
  CreativePurpose,
  PosterLayout,
  VisualType
} from '../../types/creative';
import { fetchOrGenerateCreative } from '../../services/creativeApi';
import { renderPoster, downloadPoster, copyPosterToClipboard } from '../../services/posterRenderer';
import { moneyPlantLogoSymbol } from '../../assets/logo';

interface CreativeStudioProps {
  onBackToWebsite?: () => void;
}

const EXAMPLE_TOPICS = [
  { label: 'Business Loan', purpose: 'product' },
  { label: 'Working Capital', purpose: 'product' },
  { label: 'How a Loan Works', purpose: 'educational' },
  { label: 'Why Credit Score Matters', purpose: 'educational' },
  { label: 'Home Loan vs Loan Against Property', purpose: 'educational' },
  { label: 'Home Loan', purpose: 'product' },
  { label: 'Car Loan', purpose: 'product' },
  { label: 'CGTMSE', purpose: 'product' },
  { label: 'Diwali', purpose: 'festival' },
  { label: 'Financial Planning Tips', purpose: 'product' },
  { label: 'Customer Appreciation', purpose: 'general_marketing' }
];

const LAYOUT_OPTIONS: { id: PosterLayout; name: string }[] = [
  { id: 'layout_a_editorial', name: 'Premium Editorial' },
  { id: 'layout_b_corporate_split', name: 'Corporate Split' },
  { id: 'layout_c_cinematic_scrim', name: 'Cinematic Scrim' },
  { id: 'layout_d_product_showcase', name: 'Product Showcase' },
  { id: 'layout_e_executive_finance', name: 'Executive Finance' },
  { id: 'layout_f_clean_financial', name: 'Clean Financial' },
  { id: 'layout_g_educational', name: 'Educational' },
  { id: 'layout_h_festive_corporate', name: 'Festive Corporate' },
  { id: 'layout_i_announcement', name: 'Announcement' },
  { id: 'layout_j_service_showcase', name: 'Service Showcase' }
];

export const CreativeStudio: React.FC<CreativeStudioProps> = ({ onBackToWebsite }) => {
  // Primary Workflow States
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentCreative, setCurrentCreative] = useState<GeneratedCreative | null>(null);

  // Optional Controls
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dimensions, setDimensions] = useState<PosterDimensions>('2160x2160');
  const [style, setStyle] = useState<CreativeStyle>('corporate');
  const [purpose, setPurpose] = useState<CreativePurpose>('product');
  const [categoryOverride, setCategoryOverride] = useState<CreativeCategory | ''>('');

  // Interactive Tools
  const [showEditor, setShowEditor] = useState(false);
  const [showPromptDetails, setShowPromptDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  // High-Resolution Production Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Re-render poster whenever currentCreative or dimensions change
  useEffect(() => {
    if (currentCreative && canvasRef.current) {
      renderPoster(canvasRef.current, currentCreative, dimensions);
    }
  }, [currentCreative, dimensions]);

  // Primary Action: Generate Creative
  const handleGenerate = async (overrideTopic?: string) => {
    const inputTopic = (overrideTopic || topic).trim();
    if (!inputTopic) return;

    if (overrideTopic) {
      setTopic(overrideTopic);
    }

    setIsGenerating(true);
    setCopied(false);

    try {
      const result = await fetchOrGenerateCreative({
        topic: inputTopic,
        categoryOverride: (categoryOverride as CreativeCategory) || undefined,
        dimensions,
        style,
        purpose,
        seed: Math.floor(Math.random() * 10000)
      });

      setCurrentCreative(result);
    } catch (err) {
      console.error('Failed to generate creative:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Regeneration Action: keeps topic & branding, shifts composition & copy
  const handleRegenerate = async () => {
    if (!currentCreative) return;
    setIsGenerating(true);
    setCopied(false);

    try {
      const nextSeed = currentCreative.seed + 1 + Math.floor(Math.random() * 5);
      const result = await fetchOrGenerateCreative({
        topic: currentCreative.topic,
        categoryOverride: (categoryOverride as CreativeCategory) || undefined,
        dimensions,
        style,
        purpose,
        seed: nextSeed
      });

      setCurrentCreative(result);
    } catch (err) {
      console.error('Failed to regenerate:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Layout Switcher
  const handleLayoutChange = (layoutId: PosterLayout) => {
    if (!currentCreative) return;
    const updated = { ...currentCreative, layout: layoutId };
    setCurrentCreative(updated);
  };

  // Visual Type Switcher (Infographic vs Photography)
  const handleVisualTypeChange = (vt: VisualType) => {
    if (!currentCreative) return;
    const updated: GeneratedCreative = {
      ...currentCreative,
      visualType: vt,
      spec: {
        ...currentCreative.spec,
        visualType: vt
      }
    };
    setCurrentCreative(updated);
  };

  // Text Editor updates
  const handleFieldUpdate = (field: keyof GeneratedCreative, value: any) => {
    if (!currentCreative) return;
    setCurrentCreative({
      ...currentCreative,
      [field]: value
    });
  };

  const handleDownload = () => {
    if (!canvasRef.current || !currentCreative) return;
    downloadPoster(canvasRef.current, currentCreative.topic);
  };

  const handleCopy = async () => {
    if (!canvasRef.current) return;
    const ok = await copyPosterToClipboard(canvasRef.current);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setCurrentCreative(null);
    setTopic('');
  };

  // Helper labels for resolutions
  const getResolutionBadge = () => {
    if (dimensions === '2160x2700') return '2160 × 2700 px • High Resolution Portrait (4:5)';
    if (dimensions === '3840x2160') return '3840 × 2160 px • 4K UHD High Resolution Landscape (16:9)';
    return '2160 × 2160 px • Ultra-HD High Resolution Square (1:1)';
  };

  // Visual Type metadata helper
  const getVisualTypeBadge = () => {
    if (!currentCreative) return null;
    switch (currentCreative.visualType) {
      case 'cash_cycle':
        return { label: '🔄 Cash Flow Cycle Diagram', tag: 'Procedural Infographic' };
      case 'flowchart':
        return { label: '⚡ 5-Stage Process Flowchart', tag: 'Procedural Flowchart' };
      case 'credit_gauge':
        return { label: '📊 Credit Bureau Gauge Dashboard', tag: 'Procedural Dashboard' };
      case 'comparison':
        return { label: '⚖️ Comparative Matrix Grid', tag: 'Comparison Grid' };
      case 'hybrid_growth':
        return { label: '📈 Enterprise Scaling Roadmap', tag: 'Hybrid Photo + Graph' };
      case 'property':
        return { label: '🏢 Residential Architecture Visual', tag: 'Thematic Property' };
      case 'vehicle':
        return { label: '🚗 Automotive Fleet Commercial', tag: 'Thematic Automotive' };
      case 'festive':
        return { label: '🪔 Festive Corporate Radiance', tag: 'Festive Corporate' };
      case 'benefit_tree':
        return { label: '🌳 Operational Value Tree', tag: 'Information Design' };
      default:
        return { label: '📸 Curated Corporate Commercial', tag: 'Commercial Photography' };
    }
  };

  const visualBadge = getVisualTypeBadge();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 selection:bg-brand-fresh/30">
      {/* Studio Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 aspect-square rounded-xl bg-brand-forest/10 flex items-center justify-center p-1.5 border border-brand-forest/15">
              <img
                src={moneyPlantLogoSymbol}
                alt="MoneyPlant Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#1E3F0A]">
                  MONEY<span className="text-[#527E24]">PLANT</span>
                </span>
                <span className="bg-brand-forest text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Theme-Aware Visual Intelligence Studio
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Ultra-HD Corporate Financial Advertising & Infographic Generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onBackToWebsite && (
              <button
                onClick={onBackToWebsite}
                className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-brand-forest px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ← Back to Website
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Step 1: Input Dashboard View (when no poster is generated yet) */}
        {!currentCreative ? (
          <div className="max-w-3xl mx-auto mt-4">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-premium border border-slate-100 text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-brand-forest border border-emerald-200/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Theme First • Visual Second • Design Third</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                MONEYPLANT AI CREATIVE STUDIO
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
                Generate formal, theme-relevant marketing posters, process flowcharts, cash cycles, and credit dashboards at genuine 2160px+ high resolution.
              </p>

              {/* Main Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGenerate();
                }}
                className="mt-8"
              >
                <div className="text-left mb-2">
                  <label htmlFor="topic-input" className="block text-xs sm:text-sm font-bold text-slate-700">
                    What do you want to create?
                  </label>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      id="topic-input"
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g. Working Capital, How a Loan Works, Credit Score, Home Loan vs LAP..."
                      className="w-full px-5 py-4 text-base sm:text-lg bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-brand-emerald focus:outline-none focus:ring-4 focus:ring-brand-emerald/10 transition-all font-medium placeholder:text-slate-400"
                      disabled={isGenerating}
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isGenerating || !topic.trim()}
                    className="inline-flex items-center justify-center gap-2 bg-brand-forest hover:bg-brand-dark text-white px-8 py-4 rounded-2xl text-base sm:text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 shrink-0 cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin text-brand-fresh" />
                        <span>Art-Directing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-brand-fresh" />
                        <span>Generate Creative ✨</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Suggestion Chips */}
              <div className="mt-6 pt-6 border-t border-slate-100 text-left">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                  Suggested Thematic Topics & Financial Visuals:
                </span>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_TOPICS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleGenerate(item.label)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-brand-light text-slate-700 hover:text-brand-forest border border-slate-200 hover:border-brand-emerald/40 transition-colors cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Controls Accordion */}
              <div className="mt-6 text-left">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Optional Format, Style & Purpose Controls</span>
                  {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showAdvanced && (
                  <div className="mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        FORMAT (Target Resolution)
                      </label>
                      <select
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value as PosterDimensions)}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-emerald"
                      >
                        <option value="2160x2160">Square (2160 × 2160 px) • Ultra-HD</option>
                        <option value="2160x2700">Portrait (2160 × 2700 px) • 4:5 High-Res</option>
                        <option value="3840x2160">Landscape (3840 × 2160 px) • 4K UHD Banner</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        STYLE
                      </label>
                      <select
                        value={style}
                        onChange={(e) => setStyle(e.target.value as CreativeStyle)}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-emerald"
                      >
                        <option value="corporate">Corporate (Formal Financial)</option>
                        <option value="premium">Premium (Clean Luxury)</option>
                        <option value="minimal">Minimal (High Whitespace)</option>
                        <option value="bold">Bold (Impactful High-Contrast)</option>
                        <option value="elegant">Elegant (Subtle Warmth)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        PURPOSE
                      </label>
                      <select
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value as CreativePurpose)}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-emerald"
                      >
                        <option value="product">Product (Financing / Loan)</option>
                        <option value="educational">Educational (CIBIL / Flowchart)</option>
                        <option value="festival">Festival (Diwali / New Year)</option>
                        <option value="announcement">Announcement (Service Launch)</option>
                        <option value="general_marketing">General Marketing (Trust)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quality & Production Guarantees */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Theme-Aware Visuals</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Flowcharts, cash-cycles, credit gauges, comparisons, or architecture based directly on the topic.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Financial Compliance Guard</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Strips unsupported promises. Standard institutional lender terms applied automatically.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">2160px+ Vector Engine</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Rendered natively on high-resolution production canvas with lossless PNG export.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: Generated Creative Studio View */
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 text-brand-forest border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {currentCreative.categoryLabel}
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                    <span>{currentCreative.topic}</span>
                    {visualBadge && (
                      <span className="text-xs text-brand-forest font-bold bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-brand-emerald/30 inline-flex items-center gap-1">
                        <span>{visualBadge.label}</span>
                        <span className="text-emerald-700 text-[10px]">({currentCreative.visualRelevanceScore}% Relevancy)</span>
                      </span>
                    )}
                    <span className="text-xs text-brand-emerald font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {getResolutionBadge()}
                    </span>
                  </h2>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-2.5">
                <button
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                  title="Generate a new layout and copy variation"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>Regenerate</span>
                </button>

                <button
                  onClick={() => setShowEditor(!showEditor)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    showEditor ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title="Customize Copy"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Customize Copy</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  title="Copy high-resolution poster to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Image'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-brand-forest hover:bg-brand-dark text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer"
                  title="Download full 2160px+ production PNG"
                >
                  <Download className="w-4 h-4 text-brand-fresh" />
                  <span>Download High-Resolution PNG</span>
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span>+ Create Another</span>
                </button>
              </div>
            </div>

            {/* Layout & Visual Mode Quick Selector Bar */}
            <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3 overflow-x-auto scrollbar-none">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Layout:</span>
              </span>
              {LAYOUT_OPTIONS.map((lo) => (
                <button
                  key={lo.id}
                  onClick={() => handleLayoutChange(lo.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    currentCreative.layout === lo.id
                      ? 'bg-brand-forest text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {lo.name}
                </button>
              ))}

              <div className="h-5 w-px bg-slate-200 mx-2 shrink-0" />

              {/* Format Switcher */}
              <div className="flex items-center gap-1 shrink-0">
                {(['2160x2160', '2160x2700', '3840x2160'] as PosterDimensions[]).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setDimensions(fmt)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      dimensions === fmt
                        ? 'bg-emerald-100 text-brand-forest border border-brand-emerald'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {fmt === '2160x2160' ? 'Square 1:1' : fmt === '2160x2700' ? 'Portrait 4:5' : 'Landscape 16:9'}
                  </button>
                ))}
              </div>
            </div>

            {/* Studio Workspace: Canvas Preview + Copy Customizer Drawer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* High-Resolution Production Canvas Container */}
              <div className={`${showEditor ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col items-center`}>
                <div
                  className="w-full bg-slate-900 rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-300 relative group overflow-hidden"
                  style={{
                    maxWidth: dimensions === '3840x2160' ? '920px' : '640px',
                    aspectRatio:
                      dimensions === '2160x2160'
                        ? '1 / 1'
                        : dimensions === '2160x2700'
                        ? '2160 / 2700'
                        : '3840 / 2160'
                  }}
                >
                  {/* High-Resolution Production Canvas Buffer */}
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain rounded-2xl shadow-inner bg-white"
                  />

                  {/* Loading overlay if art-directing/regenerating */}
                  {isGenerating && (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white rounded-2xl gap-3">
                      <RefreshCw className="w-8 h-8 animate-spin text-brand-fresh" />
                      <span className="font-bold text-sm tracking-wide">Compositing 2160px+ Production Poster...</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 text-center text-xs text-slate-500 flex items-center justify-center flex-wrap gap-3">
                  <span>✓ Vector SVG MoneyPlant Logo</span>
                  <span>•</span>
                  <span>✓ Theme-Aware Visual Relevance: {currentCreative.visualRelevanceScore}%</span>
                  <span>•</span>
                  <span>✓ 2160px+ Production Resolution</span>
                  <span>•</span>
                  <span>✓ Lossless High-Res PNG Export</span>
                </div>

                {/* AI Creative Director Semantic Prompt Viewer */}
                <div className="mt-4 w-full max-w-2xl bg-white p-3.5 rounded-2xl border border-slate-200 text-left">
                  <button
                    onClick={() => setShowPromptDetails(!showPromptDetails)}
                    className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-brand-forest transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-emerald" />
                      <span>Art Director Visual Intelligence & Prompt</span>
                    </span>
                    {showPromptDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {showPromptDetails && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs text-slate-600 space-y-2 animate-in fade-in duration-150">
                      <div>
                        <span className="font-bold text-slate-800">Visual Relevance Rationale:</span>
                        <p className="mt-0.5 text-slate-600">{currentCreative.visualRelevanceRationale}</p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-800">AI Imagery / Diagram Prompt:</span>
                        <p className="mt-0.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-700">
                          {currentCreative.semanticImagePrompt}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Copy Customizer Drawer */}
              {showEditor && (
                <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 animate-in slide-in-from-right-4 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                      <Edit3 className="w-4 h-4 text-brand-emerald" />
                      <span>Customize Copy</span>
                    </h3>
                    <span className="text-[11px] text-slate-400">Live preview updates</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Category / Topic Badge
                    </label>
                    <input
                      type="text"
                      value={currentCreative.topicBadge}
                      onChange={(e) => handleFieldUpdate('topicBadge', e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-emerald"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Headline (3–8 Words)
                    </label>
                    <textarea
                      rows={2}
                      value={currentCreative.headline}
                      onChange={(e) => handleFieldUpdate('headline', e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-emerald"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Supporting Statement (1–2 Sentences)
                    </label>
                    <textarea
                      rows={2}
                      value={currentCreative.subheadline}
                      onChange={(e) => handleFieldUpdate('subheadline', e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-emerald"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Benefits / Key Points (1 per line)
                    </label>
                    <textarea
                      rows={3}
                      value={currentCreative.featurePoints.join('\n')}
                      onChange={(e) => handleFieldUpdate('featurePoints', e.target.value.split('\n'))}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-emerald"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Call to Action (CTA Text)
                    </label>
                    <input
                      type="text"
                      value={currentCreative.ctaText}
                      onChange={(e) => handleFieldUpdate('ctaText', e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-emerald"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Compliance Disclaimer
                    </label>
                    <input
                      type="text"
                      value={currentCreative.disclaimer}
                      onChange={(e) => handleFieldUpdate('disclaimer', e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-emerald"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleDownload}
                      className="w-full bg-brand-forest hover:bg-brand-dark text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-brand-fresh" />
                      <span>Download High-Resolution PNG</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
