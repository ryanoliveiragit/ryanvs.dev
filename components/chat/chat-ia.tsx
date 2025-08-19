"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, User, Bot, ArrowLeft, Clock, Building2, MapPin, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { knowledgeBase } from "./db/db";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_ACTIONS = [
  { text: "Quais são as principais habilidades técnicas?", query: "principais habilidades técnicas", icon: "⚡", category: "tech" },
  { text: "Quais são os hobbies e interesses pessoais?", query: "hobbies e interesses pessoais", icon: "🎮", category: "personal" },
  { text: "Conte sobre os projetos no Instituto JogaJunto", query: "projetos instituto jogajunto", icon: "🏢", category: "work" },
  { text: "Qual a opinião dele sobre Bitcoin?", query: "btc", icon: "₿", category: "crypto" },
  { text: "Que idiomas ele está estudando?", query: "idiomas estudando russo coreano", icon: "🌐", category: "language" },
  { text: "Como Ryan se define pessoalmente?", query: "como se define personalidade", icon: "👤", category: "about" }
];

export const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setShowSuggestions(true);
      setInputValue("");
      setIsLoading(false);
    }
  }, [isOpen]);

  // Calculate experience years
  const experienceYears = new Date().getFullYear() - 2022; // Started in 2022
  const companiesCount = new Set(knowledgeBase.experience.map(exp => exp.company)).size;

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Saudações e apresentação
    if (message.includes("oi") || message.includes("olá") || message.includes("hello") || message.includes("boa") || message.includes("eai")) {
      return `Olá! 👋 Muito prazer!\n\nSou a **IA especializada no Ryan** (versão ${knowledgeBase.version}) e tenho acesso à base de conhecimento mais atualizada sobre ele.\n\n**🔍 Posso te ajudar com**:\n• Experiência profissional detalhada\n• Stack técnico e projetos\n• Informações de contato\n• Background em design\n• Formação e cursos\n• Hobbies e interesses pessoais\n• Personalidade e valores\n• Preferências técnicas\n• Metas de aprendizado\n\n**O que você gostaria de descobrir sobre o Ryan?** ✨`;
    }

    // Habilidades técnicas - palavras-chave ampliadas
    if (message.includes("habilidade") || message.includes("skill") || message.includes("tecnologia") || 
        message.includes("stack") || message.includes("programação") || message.includes("técnica") ||
        message.includes("principais") || message.includes("react") || message.includes("next") ||
        message.includes("typescript") || message.includes("frontend") || message.includes("backend")) {
      const skills = knowledgeBase.skills;
      return `**⚡ Stack Técnico Completo do Ryan**:\n\n**🚀 Frontend Core**\n• ${skills.frontend.core.join(" • ")}\n\n**🎨 Styling & Design**\n• ${skills.frontend.styling.join(" • ")}\n• ${skills.design.tools.join(" • ")}\n\n**📊 Bibliotecas & Ferramentas**\n• ${skills.frontend.libraries.join(" • ")}\n• ${skills.frontend.tools.join(" • ")}\n\n**⚡ Backend & Conceitos**\n• ${skills.backend.languages.join(" • ")}\n• ${skills.backend.concepts.join(" • ")}\n\n**🛠️ Metodologias**\n• ${skills.others.methodologies.join(" • ")}\n\n**💪 Soft Skills**\n• ${skills.others.soft_skills.join(" • ")}\n\n**🏆 Especialidades**\n• ${skills.others.specialties.join(" • ")}`;
    }

    // Hobbies e interesses - palavras-chave ampliadas
    if (message.includes("hobby") || message.includes("interesse") || message.includes("gosta") || 
        message.includes("tempo livre") || message.includes("diversão") || message.includes("pessoal") ||
        message.includes("atividade") || message.includes("fazer") || message.includes("curtir")) {
      const hobbies = knowledgeBase.hobbies;
      return `**🎮 Universo Pessoal do Ryan**:\n\n**🌍 Paixões & Atividades**\n${hobbies.general.map(hobby => `• ${hobby}`).join('\n')}\n\n**🎮 Gaming World**\n• **Jogo Favorito**: ${hobbies.games.favorite} 🏆\n• **Outros Games**: ${hobbies.games.others}\n• Aprecia estratégia e trabalho em equipe\n• Vê paralelos entre gaming e programação\n\n**₿ Mundo Crypto**\n• **Filosofia**: ${hobbies.crypto.position}\n• **Moeda do Coração**: ${hobbies.crypto.favorite_coin}\n• Estuda economia e mercados financeiros\n• Acredita na descentralização financeira\n\n**🌐 Jornada dos Idiomas**\n• **Nativo**: ${knowledgeBase.languages.native} 🇧🇷\n• **Estudando**: ${knowledgeBase.languages.learning.join(', ')} 📚\n• **Próximos**: ${knowledgeBase.languages.interest.join(', ')} 🎯\n\n**💡 Filosofia**: *"${knowledgeBase.profile.self_summary}"*`;
    }

    // JogaJunto - palavras-chave ampliadas
    if (message.includes("jogajunto") || message.includes("joga junto") || message.includes("instituto") ||
        message.includes("projeto") || message.includes("plataforma") || message.includes("fullstack")) {
      const jogaJuntoExps = knowledgeBase.experience.filter(exp => 
        exp.company.toLowerCase().includes("jogajunto")
      );
      if (jogaJuntoExps.length > 0) {
        return `**🏢 Experiência no Instituto JogaJunto**:\n\n${jogaJuntoExps.map(exp => 
          `**📅 ${exp.period}** - ${exp.position}\n\n**🎯 Principais Conquistas**:\n${exp.responsibilities.map(resp => `✅ ${resp}`).join('\n')}\n\n**💻 Stack Utilizado**:\n${exp.technologies.map(tech => `• ${tech}`).join('\n')}\n\n**🚀 Impacto do Projeto**:\n${exp.description}`
        ).join('\n\n---\n\n')}\n\n**🌟 Destaque**: Ryan participou de **todas as etapas** dos projetos, desde concepção até deploy, atuando também como **revisor de UI/UX**!`;
      }
    }

    // Bitcoin e crypto - palavras-chave ampliadas
    if (message.includes("bitcoin") || message.includes("btc") || message.includes("crypto") || message.includes("Bitcoin") || message.includes("Bitcoin") || message.includes("bitcoin") || 
        message.includes("moeda") || message.includes("maximalist") || message.includes("investimento") ||
        message.includes("opinião") || message.includes("economia")) {
      return `**₿ Ryan e o Mundo Bitcoin**:\n\n**🚀 Posição Filosófica**\n${knowledgeBase.hobbies.crypto.position} 💪\n\n**💰 Moeda de Escolha**\n${knowledgeBase.hobbies.crypto.favorite_coin} - A mãe de todas as cryptos!\n\n**🧠 Por que Bitcoin Maximalist?**\n• Acredita na **descentralização financeira** como futuro\n• Vê o BTC como **reserva de valor digital** definitiva\n• Estuda os **princípios econômicos** por trás da tecnologia\n• Defende a **soberania financeira individual**\n\n**📈 Atividades Relacionadas**\n• ${knowledgeBase.hobbies.general.find(hobby => hobby.includes("mercados"))}\n• Acompanha análises técnicas e fundamentais\n• Participa de discussões sobre economia e futuro financeiro\n• Estuda macroeconomia para entender melhor os mercados\n\n**🎯 Aprendizado Atual**\n*"${knowledgeBase.learning_goals.short_term.find(goal => goal.includes("economia"))}"* - Aprofundando conhecimento para ser um investidor mais consciente!\n\n**💡 Filosofia**: O Bitcoin não é apenas investimento, é uma **revolução no sistema financeiro** mundial! 🌍`;
    }

    // Idiomas - palavras-chave ampliadas
    if (message.includes("idioma") || message.includes("língua") || message.includes("russo") || 
        message.includes("coreano") || message.includes("inglês") || message.includes("português") ||
        message.includes("estudando") || message.includes("aprender") || message.includes("language")) {
      const languages = knowledgeBase.languages;
      return `**🌐 Jornada Linguística do Ryan**:\n\n**🇧🇷 Idioma Nativo**\n${languages.native} - Fluente total! 🏆\n\n**📚 Estudando Ativamente**\n${languages.learning.map(lang => `• **${lang}** 🇷🇺 - Estudando no momento`).join('\n')}\n\n**🎯 Na Mira para o Futuro**\n${languages.interest.map(lang => `• **${lang}** 🇰🇷 - Muito interesse!`).join('\n')}\n\n**🤔 Por que esses idiomas?**\n\n**🇷🇺 Russo**:\n• Desafio linguístico extremo (alfabeto cirílico!)\n• Interesse na rica cultura russa\n• Expansão de horizontes intelectuais\n• País com grande influência geopolítica\n\n**🇰🇷 Coreano**:\n• Cultura pop coreana em ascensão\n• Interesse em K-dramas e música\n• País tecnologicamente avançado\n• Abertura para novas experiências culturais\n\n**🎯 Meta de Médio Prazo**\n*"${knowledgeBase.learning_goals.mid_term.find(goal => goal.includes('russo'))}"*\n\n**💡 Filosofia**: Cada novo idioma é uma **nova forma de ver o mundo**! 🌍✨`;
    }

    // Como se define - palavras-chave ampliadas
    if (message.includes("define") || message.includes("personalidade") || message.includes("como é") || 
        message.includes("jeito") || message.includes("caráter") || message.includes("pessoa") ||
        message.includes("sobre") || message.includes("quem") || message.includes("resumo")) {
      const personality = knowledgeBase.personality;
      const profile = knowledgeBase.profile;
      return `**🧠 O Ryan por ele mesmo**:\n\n**🎯 Auto-definição**\n*"${profile.self_summary}"*\n\n**👤 Perfil Completo**\n• **${profile.age} anos** vivendo intensamente\n• **Brasileiro** orgulhoso de **${profile.location}**\n• **Nickname**: ${profile.nickname} (é assim que é conhecido!)\n• **Nascido em**: ${profile.birth_year} - Geração digital nativa\n\n**💪 Superpoderes (Pontos Fortes)**\n${personality.strengths.map(strength => `🚀 ${strength}`).join('\n')}\n\n**🔥 Valores que Movem o Ryan**\n${personality.values.map(value => `⭐ ${value}`).join('\n')}\n\n**🛠️ Filosofia Profissional**\n*"${personality.approach}"*\n\n**💭 Visão de Trabalho**\n*"${personality.philosophy}"*\n\n**🎯 Objetivo de Vida**\n*"${profile.objective}"*\n\n**🌟 Resumo**: Ryan é aquela pessoa que **combina paixão por tecnologia** com **curiosidade insaciável**, sempre buscando **evoluir** e **impactar positivamente** através do que faz! 🚀✨`;
    }

    // Adicionar mais casos específicos para melhorar cobertura
    if (message.includes("experiência") || message.includes("trabalho") || message.includes("carreira")) {
      const totalExperience = knowledgeBase.experience.length;
      const companies = knowledgeBase.experience.map(exp => exp.company).join(', ');
      return `**💼 Trajetória Profissional do Ryan**:\n\n**📊 Números da Carreira**\n• **${experienceYears}+ anos** de experiência sólida\n• **${companiesCount} empresas** diferentes\n• **${totalExperience} posições** de crescimento\n\n**🏢 Jornada Completa**\n${knowledgeBase.experience.map(exp => 
        `**${exp.company}** (${exp.period})\n• ${exp.position}\n• ${exp.description.substring(0, 120)}...`
      ).join('\n\n')}\n\n**🎯 Objetivo Atual**\n*"${knowledgeBase.profile.objective}"*`;
    }

    if (message.includes("contato") || message.includes("email") || message.includes("telefone")) {
      const contact = knowledgeBase.profile.contact;
      return `**📞 Como Conectar com o Ryan**:\n\n**💼 Contatos Profissionais**\n• **Email**: ${contact.email}\n• **Telefone**: ${contact.phone}\n• **Portfolio**: ${contact.website}\n\n**🌐 Redes Sociais**\n• **Instagram**: ${contact.social.instagram}\n• **GitHub**: ${contact.social.github}\n• **Bento**: ${contact.social.bento}\n\n**📍 Localização**: ${knowledgeBase.profile.location}\n\n**✨ Status Atual**: ${knowledgeBase.availability.status}`;
    }

    // Resposta padrão mais útil
    return `**🤔 Hmm, interessante pergunta!**\n\nPosso te ajudar com informações detalhadas sobre:\n\n**💻 Lado Técnico**\n• Stack completo (React, Next.js, TypeScript...)\n• Projetos e experiências\n• Metodologias e preferências\n\n**🎮 Lado Pessoal**\n• Hobbies (${knowledgeBase.hobbies.games.favorite}, crypto, viagens)\n• Estudos (${knowledgeBase.languages.learning.join(', ')}, economia)\n• Personalidade e valores\n\n**💼 Lado Profissional**\n• Experiências (${knowledgeBase.experience.slice(0,3).map(exp => exp.company).join(', ')}...)\n• Projetos de destaque\n• Contatos e disponibilidade\n\n**Clique em uma das perguntas rápidas acima ou seja mais específico sobre o que quer saber!** 🚀✨`;
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user", 
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setShowSuggestions(false);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(textToSend),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 800 + Math.random() * 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([]);
    setShowSuggestions(true);
    setInputValue("");
    setIsLoading(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleQuickAction = (query: string, displayText: string) => {
    // Adiciona a mensagem do usuário com o texto do botão
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user", 
      content: displayText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setShowSuggestions(false);

    // Processa a resposta com a query otimizada
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(query),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/10 dark:bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="relative border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  {messages.length > 0 && (
                    <button
                      onClick={handleReset}
                      className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                      title="Voltar ao início"
                    >
                      <ArrowLeft size={18} className="text-neutral-600 dark:text-neutral-400" />
                    </button>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-neutral-900 dark:bg-neutral-100 rounded-full flex items-center justify-center">
                        <Sparkles size={20} className="text-white dark:text-black" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-neutral-950">
                        <div className="w-full h-full rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                          Ryan Assistant
                        </h3>
                   
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                        <Zap size={12} className="text-green-500" />
                        Especialista em {knowledgeBase.profile.name}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  title="Fechar"
                >
                  <X size={20} className="text-neutral-600 dark:text-neutral-400" />
                </button>
              </div>

              {/* Stats Bar */}
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                  <div className="flex items-center gap-1 text-sm">
                    <Clock size={14} className="text-neutral-500 dark:text-neutral-400" />
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">{knowledgeBase.profile.age}</span>
                    <span className="text-neutral-500 dark:text-neutral-400">anos</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm">
                    <Building2 size={14} className="text-neutral-500 dark:text-neutral-400" />
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">{experienceYears}+</span>
                    <span className="text-neutral-500 dark:text-neutral-400">exp</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm">
                    <Building2 size={14} className="text-neutral-500 dark:text-neutral-400" />
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">{companiesCount}</span>
                    <span className="text-neutral-500 dark:text-neutral-400">empresas</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin size={14} className="text-neutral-500 dark:text-neutral-400" />
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">SP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-neutral-50/50 dark:bg-neutral-950">
              {/* Welcome State */}
              {showSuggestions && messages.length === 0 && (
                <div className="p-6 space-y-6">
                  <div className="text-center space-y-4">

                    
                    <div>
                      <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Olá! 👋 
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto">
                        Sou especialista em {knowledgeBase.profile.name}{" "}
                        Clique em uma pergunta ou digite a sua!
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 px-1">
                      Perguntas rápidas
                    </h5>
                    
                    <div className="grid gap-2">
                      {QUICK_ACTIONS.map((action, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleQuickAction(action.query, action.text)}
                          className="flex items-center gap-3 w-full text-left p-4 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-all duration-200 group hover:border-neutral-300 dark:hover:border-neutral-700"
                        >
                          <span className="text-lg">{action.icon}</span>
                          <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
                            {action.text}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.length > 0 && (
                <div className="p-6 space-y-6">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-4 ${
                        message.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.type === "bot" && (
                        <div className="w-8 h-8 bg-neutral-900 dark:bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot size={16} className="text-white dark:text-black" />
                        </div>
                      )}
                      
                      <div className={`max-w-[85%] space-y-2 ${message.type === "user" ? "order-2" : ""}`}>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.type === "user"
                              ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black"
                              : "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800"
                          }`}
                        >
                          <div className="text-sm leading-relaxed whitespace-pre-line">
                            {message.content.split('**').map((part, index) => 
                              index % 2 === 1 ? (
                                <strong key={index} className="font-semibold">
                                  {part}
                                </strong>
                              ) : part
                            )}
                          </div>
                        </div>
                        <div
                          className={`text-xs text-neutral-500 dark:text-neutral-400 ${
                            message.type === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>

                      {message.type === "user" && (
                        <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1 order-1">
                          <User size={16} className="text-neutral-600 dark:text-neutral-400" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 justify-start"
                    >
                      <div className="w-8 h-8 bg-neutral-900 dark:bg-neutral-100 rounded-full flex items-center justify-center mt-1">
                        <Bot size={16} className="text-white dark:text-black" />
                      </div>
                      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua pergunta sobre o Ryan..."
                    className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-12 h-12 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-xl flex items-center justify-center hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-3 mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span>v{knowledgeBase.version}</span>
                </div>
                <div className="w-px h-3 bg-neutral-300 dark:bg-neutral-700"></div>
                <span>Powered by Ryan Data</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};