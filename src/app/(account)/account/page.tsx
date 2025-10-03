import Link from "next/link";

export default async function AccountPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-white text-2xl font-bold">G</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Account <span className="gradient-text">Access</span>
              </h1>
              <p className="text-muted-foreground mt-2">Sign in to your GymShah account</p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛠️</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Authentication Setup Required</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The authentication system is ready for implementation. You can integrate your preferred auth provider or build a custom solution.
            </p>
          </div>

          <div className="space-y-4">
            <Link 
              href="/signup" 
              className="w-full btn-primary py-4 rounded-xl font-semibold text-lg text-center block"
            >
              Create Account 🚀
            </Link>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Ready to start shopping?
              </p>
              <div className="flex gap-3">
                <Link 
                  href="/shop" 
                  className="flex-1 px-4 py-3 border border-border hover:border-primary/50 hover:bg-primary/5 rounded-xl transition-all duration-200 font-medium text-center"
                >
                  Browse Shop
                </Link>
                <Link 
                  href="/" 
                  className="flex-1 px-4 py-3 border border-border hover:border-primary/50 hover:bg-primary/5 rounded-xl transition-all duration-200 font-medium text-center"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


