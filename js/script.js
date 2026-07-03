/* ============================================================
   Emma Lee — Personal Website
   Vanilla JS: content rendering + all interactivity.
   ============================================================ */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     DATA
     --------------------------------------------------------- */
  const RESUME_HREF = 'https://drive.google.com/file/d/1dO2boFIBOtPT0oPezZbxld5jnUunw_Jk/view?usp=drive_link';

  const NAV_DEF = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'research', label: 'Research' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
  ];

  const STATS = [
    { count: 3.93, dec: 2, suf: ' / 4.0', display: '3.93', label: 'Honours GPA' },
    { count: null, dec: 0, suf: '', display: '2026', label: 'New graduate' },
    { count: 7, dec: 0, suf: '', display: '7', label: 'Harvard · Stanford · UofT collaborations (PhD+)' },
    { count: 3, dec: 0, suf: '+', display: '3', unit: 'yrs', label: 'Working experience' },
  ];

  const HIGHLIGHTS = [
    '1 manuscript under review at Science',
    'Collaborated with Harvard, Stanford & U of T labs',
    'Constructed a biomedical KG with 1.6M+ nodes and 2.2M+ relationships,',
    'Built multi-agent AI platforms with the Claude Agent SDK',
    'GPA 3.93 / 4.0 — University of Toronto honours',
  ];

  const TYPE_WORDS = ['ML / AI systems.', 'LLM applications.', 'multi-agent AI.', 'RAG pipelines.', 'knowledge graphs.'];

  const WORK = [
    { role: 'Machine Learning Engineer', org: 'Tahoe Therapeutics', period: 'Feb 2026 – Present', collaborators: [], bullets: [
      'Benchmarked frontier LLMs (OpenAI, Anthropic, Amazon Bedrock, and Qwen APIs) for biomedical information extraction, optimizing extraction quality, latency, and inference cost to reduce production expenses by ~35%.',
      "Designed multi-agent literature intelligence workflows with the Claude Agent SDK and MCP tools to autonomously discover, retrieve, and curate 300K+ biomedical publications, integrating public literature with the company's proprietary experimental data for AI-ready knowledge generation.",
      'Built a production large-scale LLM extraction pipeline that extracts clinical data into structured treatment regimens, adverse events, biomarkers, and supporting evidence for automated knowledge graph construction.',
      'Constructed a biomedical knowledge graph with 1.6M+ nodes and 2.2M+ relationships, powering KG-based AI agents for biomedical question answering and drug discovery.',
    ], tags: ['Claude Agent SDK', 'MCP', 'LiteLLM', 'RAG', 'Vector DBs', 'Bedrock'] },
    { role: 'LLM Researcher', org: 'Donnelly Centre · Harvard', period: 'Sep 2025 – Feb 2026', collaborators: ['Dr. Duncan Forster', 'Qi Wu (PhD Candidate)', 'Prof. Gary Bader', 'Prof. Chris Sander'], bullets: [
      'Engineered distributed retrieval pipelines achieving 7× greater full-text coverage and 10× more extracted evidence spans than prior systems at half the processing time.',
      'Led discussions with 10+ professors, postdocs, and PhD researchers to optimize the NER and NEL pipeline, refining annotation and extraction methods to improve downstream model performance.',
      'Leveraged the Trillium GPU cluster (4× NVIDIA H100) to pre-train models up to ~1B parameters with distributed training, mixed-precision optimization and gradient checkpointing.',
      'Produced gene embeddings via parameter-efficient fine-tuning with contrastive loss, integrated into a human gene-function interaction network with improved semantic clustering and functional enrichment.',
    ], tags: ['PyTorch', 'H100', 'Distributed training', 'PEFT', 'Contrastive learning'] },
    { role: 'Computational Genomics Researcher', org: 'University of Toronto', period: 'Jan 2025 – Aug 2025', collaborators: ['Dr. Matt J. Thorstensen', 'Dr. Else Mikkelsen', 'Prof. Jason T. Weir'], bullets: [
      'Designed large-scale orthology inference pipelines across 66 avian genomes, curating 1,468 strict single-copy orthologs with multiple sequence alignment (MUSCLE, HyPhy).',
      'Integrated trace-plot diagnostics (log prior, log-likelihood, dN/dS) into a codon-based mutation-selection model (NodeMutSel) to ensure convergence, parameter stability and biologically meaningful long-term Ne estimates.',
      'Applied hierarchical statistical models (LME in R, Bayesian MCMC in brms/Stan) to quantify ecological effects on Ne, with random intercepts for species and phylogeny.',
      'Generated data-driven evolutionary insights challenging conventional tropical demographic hypotheses. Manuscript awarded 2026 Research & Innovation Prize.',
    ], tags: ['Python', 'R (brms/Stan)', 'Bayesian modeling', 'OrthoFinder', 'HyPhy'] },
    { role: 'Biomedical NLP Researcher', org: 'Vector Institute · Donnelly', period: 'Jan 2024 – Dec 2024', collaborators: ['Dr. Duncan Forster', 'Qi Wu (PhD Candidate)', 'Prof. Charles Boone', 'Prof. Gary Bader'], bullets: [
      'Built literature mining pipelines processing 80K+ biomedical full-text articles for large-scale gene function prediction, surpassing NCBI PubTator in coverage.',
      'Constructed the most comprehensive yeast gene functional interaction network, outperforming wet-lab (Costanzo et al., 2016) and computational benchmarks; boosted state-of-the-art BIONIC for gene function, chemical-genetic interactions and drug-target prediction.',
      'Resolved a dataset-noise challenge (high precision, low accuracy) by diagnosing error propagation and testing embedding strategies for semantic clustering and denoising.',
      'Fine-tuned BioBERT (PyTorch, Hugging Face) for high-precision annotation and built an industrial-scale human gene-function network. First-author and co-author manuscripts in preparation.',
    ], tags: ['BioBERT', 'Hugging Face', 'NER', 'Knowledge graphs', 'Ray / MPI'] },
  ];

  const LEADERSHIP = [
    { role: 'VP of Partnerships', org: 'Google Developer Group (GDG) · UTSC', date: '2025 – 2026', blurb: 'Organizing 600+ participant events and coordinating 100+ tech professionals — driving project management, cross-functional teamwork, and technical community leadership.' },
    { role: 'Teaching Assistant', org: 'University of Toronto', date: '2026', blurb: 'Guided undergraduates through laboratory experiments, reinforcing concepts, techniques and data analysis; mentored students and graded to consistent academic standards.' },
    { role: 'Assistant Invigilator', org: 'University of Toronto', date: '2025 – 2026', blurb: 'Administered high-stakes exams for 100+ students under strict academic-integrity protocols, streamlining logistics and resolving issues under tight deadlines.' },
    { role: 'Chemistry Tutor', org: 'Chemistry Society at UofT (CSU)', date: '2023', blurb: 'Weekly one-on-one tutoring improving first-year chemistry comprehension; designed mock tests and personalized problem-solving strategies for exam prep.' },
    { role: 'Research Supervisor', org: 'University of Toronto', date: '2023', blurb: 'Supervised GTA high-school students through hands-on lab projects, mentoring experimental design and scientific reasoning to build confidence in the lab.' },
  ];

  const RESEARCH = [
    { num: '01', title: 'Domain-Specific Gene-Function LLM', venue: 'Donnelly Centre · Harvard University · Sep 2025 – Feb 2026', author: 'First author', status: 'In progress', badge: 'coral',
      blurb: 'A domain-specific LLM pre-trained from scratch on gene biomedical literature; PEFT + contrastive loss for functional interaction analysis.',
      collaborators: ['Dr. Duncan Forster', 'Qi Wu (PhD Candidate)', 'Prof. Gary Bader', 'Prof. Chris Sander'],
      achievements: [
         'Engineered distributed retrieval pipelines achieving 7× greater full-text coverage and 10× more extracted evidence spans than prior systems at half the processing time.',
         'Led discussions with 10+ professors, postdocs, and PhD researchers to optimize the NER and NEL pipeline, refining annotation and extraction methods to improve downstream model performance.',
         'Leveraged the Trillium GPU cluster (4× NVIDIA H100) to pre-train models up to ~1B parameters with distributed training, mixed-precision optimization and gradient checkpointing.',
         'Produced gene embeddings via parameter-efficient fine-tuning with contrastive loss, integrated into a human gene-function interaction network with improved semantic clustering and functional enrichment.',
      ],
      rskills: ['Python', 'PyArrow', 'asyncio', 'Distributed training', 'Masked/next-token prediction', 'PEFT', 'Contrastive learning', 'H100'] },
    { num: '02', title: 'Industrial-Scale Gene Function Network', venue: 'Vector Institute · Donnelly Centre · Sep 2024 – Dec 2024', author: 'First author', status: 'In preparation', badge: 'coral',
      blurb: 'Industrial-scale literature-derived network enabling higher-accuracy uncharacterized gene function prediction than generative AI.',
      collaborators: ['Dr. Duncan Forster', 'Qi Wu (PhD Candidate)', 'Prof. Charles Boone', 'Prof. Gary Bader'],
      achievements: [
        'Resolved a dataset-noise challenge (high precision, low accuracy) by diagnosing error propagation in large corpora and systematically testing embedding strategies for semantic clustering and denoising.',
        'Led discussions with 10+ professors, post-docs and PhD researchers to optimize the retrieval pipeline I originally designed, refining methods to improve model performance.',
        'Engineered an optimized large-scale full-text retrieval pipeline in Python on GPU clusters — retrieving ~7× more full texts and ~10× more spans in half the time.',
        'Constructed an industrial-scale literature-derived human gene-function interaction network, enabling higher-accuracy uncharacterized-gene prediction than generative AI.',
      ],
      rskills: ['Pandas', 'NumPy', 'Dask', 'Ray / MPI', 'PyTorch', 'Hugging Face', 'Microsoft E5 embeddings', 'NER'] },
    { num: '03', title: 'Yeast Gene Function LLM', venue: 'Vector Institute · Donnelly Centre · Jan 2024 – May 2024', author: 'Co-author', status: 'In preparation', badge: 'gray',
      blurb: 'Fine-tuned BioBERT to extract high-precision functional annotations, boosting BIONIC performance for gene & drug-target prediction.',
      collaborators: ['Dr. Duncan Forster', 'Qi Wu (PhD Candidate)', 'Prof. Charles Boone', 'Prof. Gary Bader'],
      achievements: [
        'Developed a scalable full-text retrieval pipeline processing 80K+ biomedical articles — a novel dataset surpassing platforms such as NCBI PubTator.',
        'Built the most comprehensive yeast gene functional interaction network, outperforming wet-lab (Costanzo et al., 2016) and computational benchmarks with broader coverage and higher accuracy.',
        'Boosted state-of-the-art BIONIC performance for gene function, chemical-genetic interactions and drug-target prediction through large-scale network integration.',
        'Fine-tuned BioBERT (PyTorch, Hugging Face) to extract high-precision functional annotations, enabling first-of-its-kind network construction.',
      ],
      rskills: ['BioBERT', 'PyTorch', 'Hugging Face', 'spaCy', 'NLTK', 'NER', 'GNorm2', 'BioC XML'] },
    { num: '04', title: 'Comparative Genomics Pipeline', venue: 'University of Toronto · Jan 2025 – Aug 2025', author: 'First author', status: 'Under revision', badge: 'coral',
      blurb: 'Orthology inference across 66 avian genomes with codon-based mutation-selection modeling and Bayesian hierarchical analysis.',
      collaborators: ['Dr. Matt J. Thorstensen', 'Dr. Else Mikkelsen', 'Prof. Jason T. Weir'],
      achievements: [
        'Designed large-scale orthology inference pipelines across 66 avian genomes, curating 1,468 strict single-copy orthologs with multiple sequence alignment (MUSCLE, HyPhy).',
        'Integrated trace-plot diagnostics (log prior, log-likelihood, dN/dS) into a codon-based mutation-selection model (NodeMutSel) to ensure convergence, parameter stability and biologically meaningful long-term Ne estimates.',
        'Applied hierarchical statistical models (LME in R, Bayesian MCMC in brms/Stan) to quantify ecological effects on Ne, with random intercepts for species and phylogeny.',
        'Generated data-driven evolutionary insights from large-scale comparative genomics, challenging conventional tropical demographic hypotheses.',
      ],
      rskills: ['Python', 'R (lme4/brms/emmeans)', 'SQL', 'Bash', 'Bayesian modeling', 'dN/dS', 'OrthoFinder', 'MUSCLE/HyPhy'] },
    { num: '05', title: 'HSP90-Buffered Mutations — SPT15 Genetic Screen', venue: 'Academia Sinica · Stanford University · May 2023 – Aug 2023', author: 'Contributor', status: 'Wet-lab', badge: 'gray',
      blurb: 'Large-scale S. cerevisiae genetic screens exploring Hsp90 buffering of cryptic genetic variation, with automated analysis pipelines.',
      collaborators: ['Nicholas Hoeffner (PhD Candidate)', 'Dr. Jun-Yi Leu'],
      achievements: [
        'Designed innovative experimental strategies for large-scale S. cerevisiae genetic screens, achieving higher data yield while reducing screening cost and improving sustainability.',
        'Diagnosed and resolved complex growth defects following plasmid transformations through systematic troubleshooting, medium optimization and protocol refinement.',
        'Investigated the role of Hsp90 buffering in uncovering cryptic genetic variation, contributing insights into protein-folding networks and genotype–phenotype relationships.',
        'Built modular Python pipelines automating statistical analysis and visualization of plate-reader assays; optimized procedures cut manual repetition ~80% and improved throughput and accuracy 50%+.',
      ],
      rskills: ['Python (Pandas/NumPy/SciPy)', 'Yeast culture', 'PCR mutagenesis', 'SnapGene', 'Automation', 'Data visualization'] },
    { num: '06', title: 'Macrophage Lipid-Biosensor Cell Lines', venue: 'University of Toronto · May 2024 – Aug 2024', author: 'Contributor', status: 'Wet-lab', badge: 'gray',
      blurb: 'Established RAW 264.7 macrophage lines with stable PI(3,4)P2 lipid-biosensor expression for membrane-wave dynamics studies.',
      collaborators: ['Dr. Maria Cecilia Gimenez', 'Dr. Mauricio Terebiznik'],
      achievements: [
        'Optimized transfection efficiency in RAW 264.7 macrophages expressing NES-mCherry-cPHx3 and NES-EGFP-cPHx3, overcoming low-uptake challenges.',
        'Developed and standardized protocols across Lipofectamine 3000, Neon electroporation and lentiviral transduction.',
        'Generated stable, FACS-sorted cell lines enabling efficient, reproducible studies of macrophage lipid-membrane dynamics.',
      ],
      rskills: ['Mammalian cell culture', 'Lentiviral transduction', 'Flow cytometry', 'Confocal microscopy', 'ImageJ'] },
    { num: '07', title: 'Medicinal Properties of Indigenous Sacred Plants', venue: 'University of Toronto · Jan 2023 – Apr 2023', author: 'First author', status: 'Accepted (2025)', badge: 'coral',
      blurb: 'Peer-reviewed review of 60+ studies on Thuja, Salvia, Hierochloë odorata and Nicotiana rustica and their applications.',
      collaborators: ['Prof. Rachel Sturge'],
      achievements: [
        'Conducted a comprehensive review of 60+ peer-reviewed studies on Canadian Indigenous sacred plants, evaluating their medicinal properties and potential applications in Western medicine.',
        'Authored a scholarly review article and delivered engaging presentations communicating the therapeutic significance of Indigenous healing practices to diverse audiences.',
      ],
      rskills: ['Literature review', 'Critical analysis', 'Science communication', 'Knowledge translation', 'Academic writing'] },
  ];

  const PROJECTS = [
    { kind: 'Foundation Model', name: 'Domain-Specific Gene-Function LLM', desc: 'A ~1B-parameter model pre-trained from scratch on gene literature using distributed training on 4× NVIDIA H100.', stack: ['PyTorch', 'H100', 'Mixed precision', 'PEFT'] },
    { kind: 'Knowledge Graph', name: 'Industrial-Scale Gene Function Network', desc: 'A literature-derived interaction network from 80K+ full texts, outperforming wet-lab and computational benchmarks.', stack: ['RAG', 'Vector DBs', 'Ray', 'PyArrow'] },
    { kind: 'NLP', name: 'Yeast Gene Function LLM', desc: 'BioBERT fine-tuned for high-precision functional annotation, enabling first-of-its-kind network construction.', stack: ['BioBERT', 'Hugging Face', 'NER', 'spaCy'] },
    { kind: 'Genomics', name: 'Comparative Genomics Pipeline', desc: 'Orthology inference across 66 avian genomes with Bayesian hierarchical modeling of effective population size.', stack: ['Python', 'R / Stan', 'OrthoFinder', 'HyPhy'] },
    { kind: 'Wet-Lab · Research', name: 'HSP90-Buffered Mutations — SPT15 Genetic Screen', desc: 'Designed large-scale S. cerevisiae genetic screens and modular Python pipelines automating plate-reader analysis — cutting manual repetition ~80% and improving throughput 50%+. Academia Sinica · Stanford.', stack: ['Python', 'Pandas', 'Automation', 'Yeast genetics'] },
    { kind: 'Wet-Lab · Research', name: 'Macrophage Lipid-Biosensor Cell Lines', desc: 'Established RAW 264.7 macrophage lines with stable PI(3,4)P2 biosensor expression; standardized Lipofectamine, Neon electroporation and lentiviral protocols and generated FACS-sorted stable lines. University of Toronto.', stack: ['Cell culture', 'Lentiviral transduction', 'Flow cytometry', 'ImageJ'] },
    { kind: 'Review · Research', name: 'Medicinal Properties of Indigenous Sacred Plants', desc: 'First-author review of 60+ studies on Thuja, Salvia, Hierochloë odorata and Nicotiana rustica, evaluating medicinal properties and applications in Western medicine. Peer-reviewed and accepted. University of Toronto.', stack: ['Literature review', 'Science communication', 'Academic writing'] },
  ];

  const COVER_OPTIONS = [
    'linear-gradient(120deg,#83BAF2,#FFC9DE)',
    'linear-gradient(120deg,#B9D4F5,#FF9EC4)',
    'linear-gradient(135deg,#DCE8F7,#FFD8E6)',
    'linear-gradient(120deg,#83BAF2,#FF9EC4)',
    'linear-gradient(120deg,#A9CBF0,#FFB8D4)',
    'linear-gradient(135deg,#C9E0FA,#FFC9DE)',
  ];

  const DEFAULT_POSTS = [
    { category: 'Retrieval', read: '6 min read', title: 'RAG that actually works in production', cover: COVER_OPTIONS[0], excerpt: 'Chunking, embeddings and retrieval evaluation — the parts of RAG that decide whether it survives contact with real data.', body: [
      'Retrieval-augmented generation is easy to demo and hard to ship. The gap between a notebook prototype and a production system usually comes down to three unglamorous decisions: how you chunk, how you embed, and how you measure retrieval quality.',
      'Chunking is where most quality is won or lost. Semantic boundaries beat fixed token windows; overlapping windows preserve context that naive splits destroy. For biomedical text I found structure-aware chunking on JATS and BioC XML dramatically improved span recall.',
      'Finally, you cannot improve what you do not measure. Building an automated retrieval-eval harness — precision/recall on a labelled set of queries — turned RAG tuning from guesswork into a tight optimization loop.',
    ] },
    { category: 'Agents', read: '7 min read', title: 'Designing multi-agent systems with the Claude Agent SDK & MCP', cover: COVER_OPTIONS[1], excerpt: 'How to decompose a hard retrieval-and-extraction task into cooperating agents that stay reliable at scale.', body: [
      'A single monolithic prompt collapses under a task like "find, retrieve and structure thousands of papers." Multi-agent decomposition — a discovery agent, a retrieval agent, an extraction agent — keeps each unit small enough to be reliable and testable.',
      'MCP (the Model Context Protocol) is what makes this practical: it gives agents a clean, typed interface to tools and data sources instead of brittle string plumbing. Browser automation fills the gaps where publisher APIs stop.',
      'The hardest part is not capability but reliability: structured outputs, retries, and automated evaluation at every hop are what let an agent system run unattended over thousands of documents.',
    ] },
    { category: 'Fine-tuning', read: '8 min read', title: 'Fine-tuning LLMs: PEFT, contrastive learning, and when to pre-train', cover: COVER_OPTIONS[2], excerpt: 'A practical map of the fine-tuning landscape — and the rarer case for training a domain model from scratch.', body: [
      'Most teams should reach for parameter-efficient fine-tuning first. LoRA-style adapters give you most of the benefit at a fraction of the memory and compute, and they compose cleanly with contrastive objectives when you care about embedding quality.',
      'Contrastive learning is underrated for representation tasks. When the goal is a reusable embedding space — for clustering, retrieval, or network construction — a contrastive loss often beats supervised fine-tuning on downstream metrics.',
      'Pre-training from scratch is the expensive exception, justified when general models carry biases you cannot fine-tune away. Training a ~1B-parameter gene-function model on 4× H100 taught me a lot about distributed training, mixed precision and gradient checkpointing.',
    ] },
    { category: 'Infrastructure', read: '5 min read', title: 'Building provider-agnostic LLM infrastructure', cover: COVER_OPTIONS[3], excerpt: 'Why you should never hard-code a single model provider — and how a thin abstraction pays for itself.', body: [
      'Model providers change pricing, latency and capabilities constantly. Coupling your application to one API is a liability. A thin provider-agnostic layer — I use LiteLLM — lets you route the same call to OpenAI, Anthropic, Bedrock or Qwen.',
      'The real payoff is evaluation. Once every provider sits behind one interface, benchmarking cost and quality across models becomes a config change, not a rewrite. That turns model selection into an empirical decision.',
    ] },
    { category: 'Data', read: '6 min read', title: 'Turning PDFs and XML into knowledge graphs', cover: COVER_OPTIONS[4], excerpt: 'The unglamorous pipeline that converts messy scientific documents into structured, queryable knowledge.', body: [
      'Scientific knowledge lives in the worst possible formats: PDFs, JATS XML, BioC XML. Extracting structured facts — compounds, dosages, adverse events, study evidence — means building robust parsers before any LLM ever runs.',
      'LLMs shine at the last mile: normalizing entities, linking them, and emitting structured outputs that populate a graph. Pairing deterministic parsing with LLM extraction gives you both coverage and precision.',
    ] },
  ];

  const SKILLS = [
    { group: 'AI / ML', delay: 0, items: ['LLMs', 'RAG', 'Fine-tuning (PEFT)', 'Contrastive learning', 'Model evaluation', 'PyTorch', 'Hugging Face', 'Distributed training'] },
    { group: 'GenAI stack', delay: 80, items: ['Claude Agent SDK', 'MCP', 'OpenAI', 'Anthropic', 'Amazon Bedrock', 'LiteLLM', 'Vector databases', 'Structured outputs'] },
    { group: 'Software', delay: 160, items: ['Python', 'Algorithms & DS', 'APIs', 'Docker', 'Git', 'asyncio', 'Ray / MPI', 'SQL'] },
    { group: 'Data & Cloud', delay: 0, items: ['PyArrow', 'Pandas / NumPy', 'ETL pipelines', 'GPU clusters', 'ONNX', 'Quantization'] },
    { group: 'Bioinformatics', delay: 80, items: ['BioBERT', 'NER', 'Knowledge graphs', 'OrthoFinder', 'MUSCLE / HyPhy', 'Sequence analysis'] },
  ];

  const BADGE_STYLES = {
    coral: { background: 'rgba(255,77,151,0.14)', color: 'var(--tahoe-coral-600)' },
    gray: { background: 'var(--tahoe-gray-100)', color: 'var(--tahoe-navy-700)' },
  };

  /* ---------------------------------------------------------
     STATE
     --------------------------------------------------------- */
  const state = {
    tab: 'home',
    posts: loadPosts() || DEFAULT_POSTS.slice(),
    editIndex: null,
  };

  function loadPosts() {
    try {
      const s = localStorage.getItem('emma_blog_posts');
      if (s) return JSON.parse(s);
    } catch (e) { /* ignore */ }
    return null;
  }
  function savePosts(posts) {
    try { localStorage.setItem('emma_blog_posts', JSON.stringify(posts)); } catch (e) { /* ignore */ }
  }

  /* ---------------------------------------------------------
     HELPERS
     --------------------------------------------------------- */
  function el(tag, className, html) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ---------------------------------------------------------
     NAV
     --------------------------------------------------------- */
  function renderNav() {
    const wrap = document.getElementById('navLinks');
    wrap.innerHTML = '';
    NAV_DEF.forEach((n) => {
      const a = el('a', 'nav-link' + (state.tab === n.id ? ' active' : ''), n.label);
      a.addEventListener('click', () => navTo(n.id));
      a.dataset.navId = n.id;
      wrap.appendChild(a);
    });
  }

  function navTo(id) {
    state.tab = id;
    updateNavActive();
    if (id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const target = document.getElementById('sec-' + id);
    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 56;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  function updateNavActive() {
    document.querySelectorAll('.nav-link').forEach((a) => {
      a.classList.toggle('active', a.dataset.navId === state.tab);
    });
  }

  document.getElementById('navHome').addEventListener('click', () => navTo('home'));
  document.querySelectorAll('[data-nav]').forEach((elm) => {
    elm.addEventListener('click', () => navTo(elm.getAttribute('data-nav')));
  });

  /* ---------------------------------------------------------
     STATS (rendered into hero)
     --------------------------------------------------------- */
  function renderStats() {
    const grid = document.getElementById('statsGridB');
    if (grid) {
      grid.innerHTML = '';
      STATS.forEach((s) => {
        const item = el('div', '');
        const value = el('div', 'stat-value');
        const span = el('span', '');
        span.setAttribute('data-count', s.count == null ? '' : s.count);
        span.setAttribute('data-dec', s.dec);
        span.setAttribute('data-suf', s.suf);
        span.textContent = s.count == null ? s.display : '0';
        value.appendChild(span);
        if (s.suf && s.count == null) value.appendChild(document.createTextNode(s.suf));
        if (s.unit) {
          const u = el('span', 'stat-unit', s.unit);
          value.appendChild(u);
        }
        item.appendChild(value);
        item.appendChild(el('div', 'stat-label', esc(s.label)));
        grid.appendChild(item);
      });
    }
  }

  /* ---------------------------------------------------------
     ABOUT / SKILLS
     --------------------------------------------------------- */
  function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    grid.innerHTML = '';
    SKILLS.forEach((grp) => {
      const card = el('div', 'skill-card');
      card.setAttribute('data-reveal', '');
      card.setAttribute('data-anim', 'pop');
      card.setAttribute('data-reveal-delay', grp.delay);
      card.appendChild(el('div', 'skill-group-label', esc(grp.group)));
      const tags = el('div', 'skill-tags');
      grp.items.forEach((it) => tags.appendChild(el('span', 'skill-tag', esc(it))));
      card.appendChild(tags);
      grid.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     EXPERIENCE / LEADERSHIP
     --------------------------------------------------------- */
  function renderExperience() {
    const list = document.getElementById('timelineList');
    list.innerHTML = '';
    WORK.forEach((w, i) => {
      const item = el('div', 'timeline-item');
      item.setAttribute('data-reveal', '');
      item.setAttribute('data-anim', 'right');
      item.appendChild(el('div', 'timeline-dot'));
      const head = el('div', 'timeline-head');
      head.appendChild(el('h3', '', esc(w.role)));
      head.appendChild(el('span', 'timeline-org', esc(w.org)));
      item.appendChild(head);
      item.appendChild(el('div', 'timeline-period', esc(w.period)));
      const bullets = el('ul', 'timeline-bullets');
      w.bullets.forEach((b) => bullets.appendChild(el('li', '', esc(b))));
      item.appendChild(bullets);
      const tags = el('div', 'timeline-tags');
      w.tags.forEach((t) => tags.appendChild(el('span', 'tag-pill', esc(t))));
      item.appendChild(tags);
      item.appendChild(el('div', 'timeline-cta', 'View details →'));
      item.addEventListener('click', () => openWorkModal(i));
      list.appendChild(item);
    });

    const lgrid = document.getElementById('leadershipGrid');
    lgrid.innerHTML = '';
    LEADERSHIP.forEach((l) => {
      const card = el('div', 'leadership-card');
      card.setAttribute('data-reveal', '');
      card.setAttribute('data-anim', 'pop');
      const head = el('div', 'leadership-head');
      head.appendChild(el('div', 'leadership-role', esc(l.role)));
      head.appendChild(el('span', 'leadership-date', esc(l.date)));
      card.appendChild(head);
      card.appendChild(el('div', 'leadership-org', esc(l.org)));
      card.appendChild(el('div', 'leadership-blurb', esc(l.blurb)));
      lgrid.appendChild(card);
    });
  }

  function openWorkModal(i) {
    const w = WORK[i];
    document.getElementById('workModalOrg').textContent = w.org;
    document.getElementById('workModalRole').textContent = w.role;
    document.getElementById('workModalPeriod').textContent = w.period;
    const collabBlock = document.getElementById('workModalCollabBlock');
    const collabWrap = document.getElementById('workModalCollab');
    collabWrap.innerHTML = '';
    if (w.collaborators && w.collaborators.length) {
      collabBlock.style.display = '';
      w.collaborators.forEach((c) => collabWrap.appendChild(el('span', 'modal-collab-tag', esc(c))));
    } else {
      collabBlock.style.display = 'none';
    }
    const bullets = document.getElementById('workModalBullets');
    bullets.innerHTML = '';
    w.bullets.forEach((b) => bullets.appendChild(el('li', '', esc(b))));
    const tags = document.getElementById('workModalTags');
    tags.innerHTML = '';
    w.tags.forEach((t) => tags.appendChild(el('span', 'modal-skill-tag', esc(t))));
    openModal('workOverlay');
  }

  /* ---------------------------------------------------------
     RESEARCH
     --------------------------------------------------------- */
  function renderResearch() {
    const list = document.getElementById('researchList');
    list.innerHTML = '';
    RESEARCH.forEach((r, i) => {
      const item = el('div', 'research-item');
      item.setAttribute('data-reveal', '');
      item.setAttribute('data-anim', 'up');
      item.appendChild(el('div', 'research-num', esc(r.num)));
      const mid = el('div', '');
      mid.appendChild(el('h3', '', esc(r.title)));
      mid.appendChild(el('p', '', esc(r.blurb)));
      mid.appendChild(el('div', 'research-venue', esc(r.venue)));
      item.appendChild(mid);
      const meta = el('div', 'research-meta');
      const bs = BADGE_STYLES[r.badge] || BADGE_STYLES.gray;
      const badge = el('span', 'research-badge', esc(r.author));
      badge.style.background = bs.background;
      badge.style.color = bs.color;
      meta.appendChild(badge);
      meta.appendChild(el('span', 'research-open-cta', 'Open →'));
      item.appendChild(meta);
      item.addEventListener('click', () => openResearchModal(i));
      list.appendChild(item);
    });
  }

  function openResearchModal(i) {
    const r = RESEARCH[i];
    document.getElementById('researchModalNum').textContent = r.num;
    document.getElementById('researchModalAuthor').textContent = r.author;
    document.getElementById('researchModalStatus').textContent = r.status;
    document.getElementById('researchModalTitle').textContent = r.title;
    document.getElementById('researchModalVenue').textContent = r.venue;
    const collab = document.getElementById('researchModalCollab');
    collab.innerHTML = '';
    r.collaborators.forEach((c) => collab.appendChild(el('span', 'modal-collab-tag', esc(c))));
    const ach = document.getElementById('researchModalAchievements');
    ach.innerHTML = '';
    r.achievements.forEach((a) => ach.appendChild(el('li', '', esc(a))));
    const sk = document.getElementById('researchModalSkills');
    sk.innerHTML = '';
    r.rskills.forEach((s) => sk.appendChild(el('span', 'modal-skill-tag', esc(s))));
    openModal('researchOverlay');
  }

  /* ---------------------------------------------------------
     PROJECTS
     --------------------------------------------------------- */
  function renderProjects() {
    const feature = document.getElementById('projectFeature');
    feature.innerHTML = '';
    const featured = PROJECTS[0];
    const texture = el('div', 'project-feature-texture', '');
    texture.style.backgroundImage = "url('images/texture-navy.jpg')";
    feature.appendChild(texture);
    const content = el('div', 'project-feature-content');
    content.appendChild(el('div', 'project-feature-kind', esc(featured.kind) + ' · Featured'));
    content.appendChild(el('h3', '', esc(featured.name)));
    content.appendChild(el('p', '', esc(featured.desc)));
    const stack = el('div', 'project-feature-stack');
    featured.stack.forEach((s) => stack.appendChild(el('span', 'stack-tag', esc(s))));
    content.appendChild(stack);
    feature.appendChild(content);

    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    PROJECTS.slice(1).forEach((p) => {
      const card = el('div', 'project-card');
      card.setAttribute('data-reveal', '');
      card.setAttribute('data-anim', 'pop');
      card.appendChild(el('div', 'project-card-orb', ''));
      card.appendChild(el('div', 'project-card-kind', esc(p.kind)));
      card.appendChild(el('h3', '', esc(p.name)));
      card.appendChild(el('p', '', esc(p.desc)));
      const stack2 = el('div', 'project-card-stack');
      p.stack.forEach((s) => stack2.appendChild(el('span', 'stack-tag', esc(s))));
      card.appendChild(stack2);
      grid.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     BLOG
     --------------------------------------------------------- */
  function renderBlog() {
    const grid = document.getElementById('blogGrid');
    grid.innerHTML = '';
    state.posts.forEach((post, i) => {
      const card = el('div', 'post-card');
      card.setAttribute('data-reveal', '');
      card.setAttribute('data-anim', 'pop');
      const cover = el('div', 'post-cover');
      cover.style.background = post.cover;
      cover.appendChild(el('span', 'post-category-badge', esc(post.category)));
      const editBtn = el('button', 'post-edit-btn', 'Edit');
      editBtn.addEventListener('click', (e) => { e.stopPropagation(); openEditor(i); });
      cover.appendChild(editBtn);
      card.appendChild(cover);
      const body = el('div', 'post-card-body');
      body.appendChild(el('h3', '', esc(post.title)));
      body.appendChild(el('p', '', esc(post.excerpt)));
      const meta = el('div', 'post-card-meta');
      meta.appendChild(el('span', 'post-read-time', esc(post.read)));
      meta.appendChild(el('span', 'post-read-cta', 'Read →'));
      body.appendChild(meta);
      card.appendChild(body);
      card.addEventListener('click', () => openPostModal(i));
      grid.appendChild(card);
    });
    resizeBlogCanvasSoon();
  }

  function openPostModal(i) {
    const p = state.posts[i];
    document.getElementById('postModalCover').style.background = p.cover;
    document.getElementById('postModalBadge').textContent = p.category + ' · ' + p.read;
    document.getElementById('postModalTitle').textContent = p.title;
    const bodyWrap = document.getElementById('postModalBody');
    bodyWrap.innerHTML = '';
    (p.body || []).forEach((para) => bodyWrap.appendChild(el('p', '', esc(para))));
    openModal('postOverlay');
  }

  function openEditor(i) {
    state.editIndex = (i === undefined || i === null) ? null : i;
    const isEditing = state.editIndex !== null;
    document.getElementById('editorTitle').textContent = isEditing ? 'Edit post' : 'New post';
    document.getElementById('deletePostBtn').style.display = isEditing ? '' : 'none';
    let draft;
    if (isEditing) {
      const p = state.posts[state.editIndex];
      draft = { category: p.category, read: p.read, title: p.title, cover: p.cover, excerpt: p.excerpt, body: (p.body || []).join('\n\n') };
    } else {
      draft = { category: '', read: '', title: '', cover: COVER_OPTIONS[0], excerpt: '', body: '' };
    }
    document.getElementById('fieldTitle').value = draft.title;
    document.getElementById('fieldCategory').value = draft.category;
    document.getElementById('fieldRead').value = draft.read;
    document.getElementById('fieldExcerpt').value = draft.excerpt;
    document.getElementById('fieldBody').value = draft.body;
    renderCoverSwatches(draft.cover);
    openModal('editorOverlay');
  }

  function renderCoverSwatches(selected) {
    const wrap = document.getElementById('coverSwatches');
    wrap.innerHTML = '';
    COVER_OPTIONS.forEach((g) => {
      const btn = el('button', 'cover-swatch' + (g === selected ? ' selected' : ''));
      btn.style.background = g;
      btn.dataset.cover = g;
      btn.addEventListener('click', () => {
        wrap.querySelectorAll('.cover-swatch').forEach((s) => s.classList.remove('selected'));
        btn.classList.add('selected');
      });
      wrap.appendChild(btn);
    });
  }

  function getSelectedCover() {
    const sel = document.querySelector('#coverSwatches .cover-swatch.selected');
    return sel ? sel.dataset.cover : COVER_OPTIONS[0];
  }

  function savePost() {
    const post = {
      category: (document.getElementById('fieldCategory').value || 'Notes').trim(),
      read: (document.getElementById('fieldRead').value || '5 min read').trim(),
      title: (document.getElementById('fieldTitle').value || 'Untitled').trim(),
      cover: getSelectedCover(),
      excerpt: (document.getElementById('fieldExcerpt').value || '').trim(),
      body: (document.getElementById('fieldBody').value || '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
    };
    const posts = state.posts.slice();
    if (state.editIndex == null) posts.push(post); else posts[state.editIndex] = post;
    state.posts = posts;
    savePosts(posts);
    closeModal('editorOverlay');
    renderBlog();
  }

  function deletePost() {
    if (state.editIndex == null) return;
    const posts = state.posts.filter((_, i) => i !== state.editIndex);
    state.posts = posts;
    savePosts(posts);
    closeModal('editorOverlay');
    renderBlog();
  }

  document.getElementById('newPostBtn').addEventListener('click', () => openEditor(null));
  document.getElementById('savePostBtn').addEventListener('click', savePost);
  document.getElementById('deletePostBtn').addEventListener('click', deletePost);
  document.getElementById('cancelEditorBtn').addEventListener('click', () => closeModal('editorOverlay'));
  document.getElementById('editorCloseBtn').addEventListener('click', () => closeModal('editorOverlay'));

  /* ---------------------------------------------------------
     MODALS (generic open/close)
     --------------------------------------------------------- */
  function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    if (!document.querySelector('.modal-overlay.open')) document.body.style.overflow = '';
  }
  document.getElementById('researchCloseBtn').addEventListener('click', () => closeModal('researchOverlay'));
  document.getElementById('workCloseBtn').addEventListener('click', () => closeModal('workOverlay'));
  document.getElementById('postCloseBtn').addEventListener('click', () => closeModal('postOverlay'));
  document.querySelectorAll('.modal-overlay').forEach((ov) => {
    ov.addEventListener('click', (e) => { if (e.target === ov) closeModal(ov.id); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach((ov) => closeModal(ov.id));
    }
  });

  /* ---------------------------------------------------------
     TYPEWRITER + ROTATING HIGHLIGHT
     --------------------------------------------------------- */
  function startTypewriter() {
    let wi = 0, ci = 0, deleting = false;
    const targets = () => document.querySelectorAll('[data-role-text]');
    const tick = () => {
      const w = TYPE_WORDS[wi];
      ci += deleting ? -1 : 1;
      const text = w.slice(0, ci);
      targets().forEach((t) => { t.textContent = text; });
      let delay = deleting ? 40 : 85;
      if (!deleting && ci === w.length) { delay = 1500; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % TYPE_WORDS.length; delay = 320; }
      setTimeout(tick, delay);
    };
    tick();
  }

  function startHighlights() {
    let i = 0;
    const targets = () => document.querySelectorAll('[data-highlight-text]');
    const set = () => targets().forEach((t) => { t.textContent = HIGHLIGHTS[i]; });
    set();
    setInterval(() => { i = (i + 1) % HIGHLIGHTS.length; set(); }, 3400);
  }

  /* ---------------------------------------------------------
     REVEAL ON SCROLL
     --------------------------------------------------------- */
  function initTransform(anim) {
    if (anim === 'left') return 'translateX(-48px)';
    if (anim === 'right') return 'translateX(48px)';
    if (anim === 'zoom') return 'scale(0.86)';
    if (anim === 'pop') return 'scale(0.7)';
    return 'translateY(30px)';
  }

  let revealEls = [];
  function collectRevealEls() {
    revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
    revealEls.forEach((e) => {
      if (e._revInit) return;
      e._revInit = true;
      e.style.opacity = '0';
      e.style.transform = initTransform(e.getAttribute('data-anim') || 'up');
      e.style.willChange = 'opacity, transform';
    });
  }

  function reveal() {
    collectRevealEls();
    checkReveal();
  }

  function checkReveal() {
    const vh = window.innerHeight || 800;
    revealEls.forEach((e) => {
      if (e.offsetParent === null) return; // hidden (e.g. inactive hero variant)
      const r = e.getBoundingClientRect();
      const inView = r.top < vh * 0.86 && r.bottom > vh * 0.1;
      if (inView && !e._shown) {
        e._shown = true;
        const anim = e.getAttribute('data-anim') || 'up';
        const d = e.getAttribute('data-reveal-delay') || 0;
        const ease = anim === 'pop' ? 'cubic-bezier(0.34,1.56,0.64,1)' : 'var(--ease-out)';
        e.style.transition = 'opacity .7s var(--ease-out) ' + d + 'ms, transform .8s ' + ease + ' ' + d + 'ms';
        e.style.opacity = '1';
        e.style.transform = 'none';
      } else if (!inView && e._shown) {
        e._shown = false;
        e.style.transition = 'opacity .45s var(--ease-out), transform .45s var(--ease-out)';
        e.style.opacity = '0';
        e.style.transform = initTransform(e.getAttribute('data-anim') || 'up');
      }
    });
  }

  /* ---------------------------------------------------------
     PARALLAX
     --------------------------------------------------------- */
  function parallax() {
    const vh = window.innerHeight || 800;
    document.querySelectorAll('[data-parallax]').forEach((e) => {
      const sp = parseFloat(e.getAttribute('data-parallax')) || 0.2;
      const r = e.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const off = (center - vh / 2) / vh;
      e.style.transform = 'translateY(' + (off * sp * 160).toFixed(1) + 'px)';
    });
  }

  /* ---------------------------------------------------------
     COUNT UP
     --------------------------------------------------------- */
  function countUp() {
    document.querySelectorAll('[data-count]').forEach((el2) => {
      if (el2._counted) return;
      if (el2.offsetParent === null) return;
      const to = parseFloat(el2.getAttribute('data-count'));
      if (isNaN(to)) return;
      el2._counted = true;
      const dec = parseInt(el2.getAttribute('data-dec') || '0', 10);
      const suf = el2.getAttribute('data-suf') || '';
      const dur = 1300;
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        const v = to * e;
        el2.textContent = (dec ? v.toFixed(dec) : Math.round(v).toLocaleString()) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* ---------------------------------------------------------
     SCROLL SPY
     --------------------------------------------------------- */
  function spy() {
    if (document.querySelector('.modal-overlay.open')) return;
    const ids = ['home', 'about', 'experience', 'research', 'projects', 'blog'];
    const mid = (window.innerHeight || 800) * 0.35;
    let cur = 'home';
    ids.forEach((id) => {
      const e = document.getElementById('sec-' + id);
      if (!e) return;
      if (e.getBoundingClientRect().top <= mid) cur = id;
    });
    if (cur !== state.tab) {
      state.tab = cur;
      updateNavActive();
    }
  }

  /* ---------------------------------------------------------
     CANVAS: HERO PARTICLES
     --------------------------------------------------------- */
  function startHeroCanvas() {
    const cv = document.getElementById('heroCanvas');
    if (!cv || !cv.getContext) return;
    const ctx = cv.getContext('2d');
    let W, H, dpr;
    const resize = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.width = Math.max(1, r.width * dpr);
      H = cv.height = Math.max(1, r.height * dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    const rect = cv.getBoundingClientRect();
    const N = Math.max(38, Math.min(84, Math.floor(rect.width / 17)));
    const pts = [];
    for (let i = 0; i < N; i++) {
      pts.push({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0007, vy: (Math.random() - 0.5) * 0.0007, r: Math.random() * 2 + 1.2, coral: Math.random() < 0.13 });
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      }
      const maxD = 150 * dpr;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i], b = pts[j];
          const dx = (a.x - b.x) * W, dy = (a.y - b.y) * H;
          const d = Math.hypot(dx, dy);
          if (d < maxD) {
            const o = (1 - d / maxD) * 0.16;
            ctx.strokeStyle = 'rgba(33,107,180,' + o + ')';
            ctx.lineWidth = 1 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x * W, a.y * H);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r * dpr, 0, 6.29);
        ctx.fillStyle = p.coral ? 'rgba(255,77,151,0.9)' : 'rgba(8,40,70,0.42)';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ---------------------------------------------------------
     CANVAS: DARK-SECTION PARTICLES (used by Blog + Experience)
     --------------------------------------------------------- */
  function startDarkCanvas(canvasId) {
    const cv = document.getElementById(canvasId);
    if (!cv || !cv.getContext) return null;
    const ctx = cv.getContext('2d');
    let W, H, dpr;
    const resize = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.width = Math.max(1, r.width * dpr);
      H = cv.height = Math.max(1, r.height * dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    const rect = cv.getBoundingClientRect();
    const N = Math.max(30, Math.min(72, Math.floor(rect.width / 20)));
    const pts = [];
    for (let i = 0; i < N; i++) pts.push({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0006, vy: (Math.random() - 0.5) * 0.0006, r: Math.random() * 2 + 1.2, pink: Math.random() < 0.5 });
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < 0 || p.y > 1) p.vy *= -1; }
      const maxD = 150 * dpr;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i], b = pts[j];
          const dx = (a.x - b.x) * W, dy = (a.y - b.y) * H;
          const d = Math.hypot(dx, dy);
          if (d < maxD) {
            const o = (1 - d / maxD) * 0.22;
            ctx.strokeStyle = 'rgba(150,200,250,' + o + ')';
            ctx.lineWidth = 1 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x * W, a.y * H);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r * dpr, 0, 6.29);
        const col = p.pink ? 'rgba(255,158,196,0.9)' : 'rgba(155,205,255,0.92)';
        ctx.fillStyle = col;
        ctx.shadowBlur = 7 * dpr;
        ctx.shadowColor = col;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      requestAnimationFrame(draw);
    }
    draw();
    return resize;
  }

  // Whenever posts are added/removed/edited the blog grid's height
  // changes; the canvas + glow layers are position:absolute; inset:0
  // inside the (position:relative) <section>, so they already stretch
  // to match — we just need to re-measure the canvas backing store.
  let blogResizeFn = null;
  let blogResizeTimer = null;
  function resizeBlogCanvasSoon() {
    clearTimeout(blogResizeTimer);
    blogResizeTimer = setTimeout(() => { if (blogResizeFn) blogResizeFn(); }, 60);
  }
  function watchBlogGrid() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => resizeBlogCanvasSoon());
      ro.observe(grid);
    }
  }

  /* ---------------------------------------------------------
     SCROLL LOOP
     --------------------------------------------------------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      checkReveal();
      parallax();
      spy();
    });
  }

  /* ---------------------------------------------------------
     INIT
     --------------------------------------------------------- */
  function init() {
    renderNav();
    renderStats();
    renderSkills();
    renderExperience();
    renderResearch();
    renderProjects();
    renderBlog();

    startTypewriter();
    startHighlights();
    startHeroCanvas();
    blogResizeFn = startDarkCanvas('blogCanvas');
    startDarkCanvas('researchCanvas');
    watchBlogGrid();

    reveal();
    countUp();
    window.addEventListener('scroll', onScroll, { passive: true });
    setTimeout(() => { spy(); parallax(); }, 200);
    window.addEventListener('resize', () => { checkReveal(); parallax(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
