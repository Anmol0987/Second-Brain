import { Brain, ChevronRight, Github, Search, PenLine, Sparkles, Share2, FolderKanban } from 'lucide-react';
import SplitText from "./SplitText";

const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};




export const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Navigation */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Brain className="h-8 w-8 text-purple-700" />
                            <span className="text-xl font-bold text-gray-900">Second Brain</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a
                                href="/signin"
                                className="text-purple-700 hover:text-purple-600 font-medium"
                            >
                                Sign in
                            </a>
                            <a
                                href="/signup"
                                className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="pt-32 pb-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                            <SplitText
                                text={`Your Digital Brain for${' '}`}
                                delay={150}
                                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                easing="easeOutCubic"
                                threshold={0.2}
                                rootMargin="-50px"
                                onLetterAnimationComplete={handleAnimationComplete}
                            />
                            <br />

                            <div className="text-purple-700">
                                <SplitText
                                    text="Better Thinking"
                                    delay={150}
                                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                    easing="easeOutCubic"
                                    threshold={0.2}
                                    rootMargin="-50px"
                                    onLetterAnimationComplete={handleAnimationComplete}
                                />
                            </div>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Transform your notes into a powerful knowledge network. Capture, organize, and connect your ideas effortlessly.
                        </p>

                        <div className="flex justify-center space-x-4">
                            <a
                                href="/signup"
                                className="bg-purple-700 text-white px-8 py-4 rounded-lg hover:bg-purple-600 transition flex items-center text-lg font-medium"
                            >
                                Start for free <ChevronRight className="ml-2 h-5 w-5" />
                            </a>
                            <a
                                href="https://github.com"
                                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-purple-600 hover:text-purple-600 transition flex items-center text-lg font-medium"
                            >
                                <Github className="mr-2 h-5 w-5" /> View on GitHub
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <PenLine className="h-5 w-5 text-purple-600" />
                                        <span className="font-medium text-gray-700">Quick Note</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-2 rounded-lg hover:bg-purple-50">
                                            <Share2 className="h-4 w-4 text-gray-500" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-purple-50">
                                            <Sparkles className="h-4 w-4 text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                                    <div className="h-4 bg-gray-100 rounded w-full" />
                                    <div className="h-4 bg-gray-100 rounded w-5/6" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="bg-white rounded-xl shadow-lg p-4 border border-purple-100">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Search className="h-4 w-4" />
                                        <div className="text-sm">Search your notes...</div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white rounded-xl shadow-lg p-4 border border-purple-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-medium text-gray-700">Quick Actions</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button className="p-2 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100">
                                            <PenLine className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100">
                                            <FolderKanban className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="bg-white rounded-xl shadow-lg p-4 border border-purple-100">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Notes</span>
                                            <span className="text-sm font-medium">128</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Connections</span>
                                            <span className="text-sm font-medium">45</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Active Users Badge */}
                            
{/*                         <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-8 py-4 rounded-full shadow-lg border border-purple-100 flex items-center space-x-2">
                            <span className="h-3 w-3 rounded-full bg-purple-500" />
                            <span className="text-gray-600 font-medium">1,000+ active users</span>
                        </div> */}

                        <span className="relative flex h-3 w-3">
  <span className="animate-pulseDot absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
</span>

                    </div>
                </div>
            </div>
        </div>
    );
}
