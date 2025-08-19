"use client";
import React, { useEffect, useState } from "react";
import {
  Home,
  PenTool,
  Github,
  Instagram,
  Star,
  FileText,
  Sparkles,
  Command,
  FlaskConical,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "../ui/toggle-mode";
import { AIChatModal } from "../chat/chat-ia";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut para abrir IA
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsAIModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fechar menu mobile ao clicar fora
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
      hasNotification: false,
    },
    {
      href: "/experiments",
      icon: FlaskConical,
      label: "Experimentos",
      hasNotification: false,
    },
    { 
      href: "/diario", 
      icon: PenTool, 
      label: "Diário", 
      hasNotification: true 
    },
    {
      href: "https://bento.me/ryanvs",
      icon: Star,
      label: "Bento",
      external: true,
      className: "text-amber-500 hover:text-amber-400",
    },
  ];

  const socialItems = [
    {
      href: "https://www.instagram.com/ryanvs.dev/",
      icon: Instagram,
      label: "Instagram",
    },
    {
      href: "https://github.com/ryanoliveiragit",
      icon: Github,
      label: "GitHub",
    },
  ];

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`
          fixed top-0 sm:top-4 left-0 right-0 z-40 
          transition-all duration-500 ease-out
          ${
            scrolled
              ? "bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-neutral-200/60 dark:border-neutral-800/60 shadow-sm"
              : "bg-transparent"
          }
        `}
      >
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 font-semibold text-black dark:text-white hover:opacity-80 transition-all duration-200 z-50"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity blur"></div>
            </div>
            <span className="text-lg tracking-tight">ryanvs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {/* Main Navigation */}
            <div className="flex items-center gap-1 mr-3">
              {navItems.slice(1).map(
                ({
                  href,
                  icon: Icon,
                  label,
                  hasNotification,
                  external,
                  className,
                }) => (
                  <Link
                    key={href}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="relative group p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all duration-200 hover:scale-105"
                    title={label}
                  >
                    <Icon
                      size={18}
                      className={
                        className ||
                        "text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-200"
                      }
                    />
                    {hasNotification && (
                      <div className="absolute -top-0.5 -right-0.5">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-75"></div>
                      </div>
                    )}
                  </Link>
                )
              )}

              {/* CV Link - Desktop */}
              <Link
                href="https://docs.google.com/document/d/1GQBcF_3yZji_fcc52gmC2Vagonqh9yCREHpeQcSvy8s/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all duration-200 hover:scale-105"
                title="Currículo"
              >
                <FileText size={16} />
                <span>Currículo</span>
              </Link>
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-2"></div>

            {/* Social Links */}
            <div className="flex items-center gap-1 mr-3">
              {socialItems.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all duration-200 hover:scale-105"
                  title={label}
                >
                  <Icon
                    size={18}
                    className="text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-200"
                  />
                </Link>
              ))}
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-2"></div>

            {/* AI Assistant Button */}
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="
                relative group flex items-center gap-2.5 px-4 py-2.5
                bg-gradient-to-r from-black to-neutral-800 dark:from-white dark:to-neutral-200 
                text-white dark:text-black rounded-xl
                hover:from-neutral-800 hover:to-black dark:hover:from-neutral-200 dark:hover:to-white
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-lg dark:hover:shadow-white/10
                font-medium text-sm mr-2
                border border-transparent hover:border-neutral-700 dark:hover:border-neutral-300
              "
              title="Assistente IA"
            >
              <div className="relative">
                <Sparkles
                  size={16}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
              </div>
              <span className="hidden sm:block">Assistente</span>

              {/* Keyboard shortcut hint */}
              <div className="hidden lg:flex items-center gap-1 ml-2 px-2 py-1 bg-white/10 dark:bg-black/10 rounded-md">
                <Command size={12} />
                <span className="text-xs">K</span>
              </div>

              {/* Animated background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm -z-10"></div>
            </button>

            {/* Theme Toggle */}
            <div className="group">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {/* AI Assistant Button - Mobile */}
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="p-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-xl hover:scale-105 transition-all duration-200"
              title="Assistente IA"
            >
              <Sparkles size={18} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
              title="Menu"
            >
              <Menu size={20} className="text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleMobileMenuClose}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 z-50 flex flex-col shadow-2xl md:hidden"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center">
                    <span className="text-white dark:text-black font-bold text-sm">R</span>
                  </div>
                  <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Menu
                  </h2>
                </div>
                <button
                  onClick={handleMobileMenuClose}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X size={20} className="text-neutral-600 dark:text-neutral-400" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Navigation Links */}
                <div className="space-y-2 mb-8">
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4">
                    Navegação
                  </h3>
                  {navItems.map(
                    ({
                      href,
                      icon: Icon,
                      label,
                      hasNotification,
                      external,
                      className,
                    }) => (
                      <Link
                        key={href}
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        onClick={handleMobileMenuClose}
                        className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                      >
                        <div className="relative">
                          <Icon
                            size={20}
                            className={
                              className ||
                              "text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors"
                            }
                          />
                          {hasNotification && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </div>
                        <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white font-medium">
                          {label}
                        </span>
                        {external && (
                          <span className="ml-auto text-xs text-neutral-400">↗</span>
                        )}
                      </Link>
                    )
                  )}

                  {/* CV Link */}
                  <Link
                    href="https://docs.google.com/document/d/1GQBcF_3yZji_fcc52gmC2Vagonqh9yCREHpeQcSvy8s/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleMobileMenuClose}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                  >
                    <FileText
                      size={20}
                      className="text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors"
                    />
                    <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white font-medium">
                      Currículo
                    </span>
                    <span className="ml-auto text-xs text-neutral-400">↗</span>
                  </Link>
                </div>

                {/* Social Links */}
                <div className="space-y-2 mb-8">
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4">
                    Redes Sociais
                  </h3>
                  {socialItems.map(({ href, icon: Icon, label }) => (
                    <Link
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleMobileMenuClose}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                    >
                      <Icon
                        size={20}
                        className="text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors"
                      />
                      <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white font-medium">
                        {label}
                      </span>
                      <span className="ml-auto text-xs text-neutral-400">↗</span>
                    </Link>
                  ))}
                </div>

                {/* Theme Toggle */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4">
                    Configurações
                  </h3>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400"></div>
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                        Tema
                      </span>
                    </div>
                    <ModeToggle />
                  </div>
                </div>
              </div>

              {/* Menu Footer */}
              <div className="p-6 border-t border-neutral-200 dark:border-neutral-800">
                <div className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Online agora</span>
                  </div>
                  <p>ryanvs.dev • São Paulo, Brasil</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header spacing */}
      <div className="h-16 sm:h-20"></div>

      {/* AI Chat Modal */}
      <AIChatModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
      />
    </>
  );
};