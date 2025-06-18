
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      toast.success('Welcome back!');
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url('/lovable-uploads/d61b0987-224f-4d63-8c28-c97f6128419e.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Enhanced dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <Card className="w-full max-w-md relative z-10 bg-white/10 backdrop-blur-2xl border-white/10 shadow-2xl">
        <CardHeader className="space-y-6 text-center pb-8">
          <div className="mx-auto w-20 h-20 rounded-full overflow-hidden shadow-lg bg-white/5 flex items-center justify-center p-1">
            <img 
              src="/lovable-uploads/899b2930-d56c-4420-8ddd-44246b9b46f0.png" 
              alt="AltaPro Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-3">
            <CardTitle className="text-3xl font-bold text-white">
              Welcome Back
            </CardTitle>
            <p className="text-orange-300 font-medium text-lg">AltaPro Timesheet</p>
            <p className="text-white/70 text-sm">Sign in to your account to continue</p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90 font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 focus:border-orange-400/50 focus:ring-orange-400/20 text-white placeholder:text-white/50 backdrop-blur-sm h-12"
                placeholder="john.doe@company.com"
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90 font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-orange-400/50 focus:ring-orange-400/20 text-white placeholder:text-white/50 backdrop-blur-sm h-12 pr-12"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-white/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <Label htmlFor="remember" className="text-white/70 text-sm cursor-pointer">
                  Remember Me
                </Label>
              </div>
              <button
                type="button"
                className="text-orange-300 hover:text-orange-200 text-sm font-medium transition-colors underline-offset-4 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 h-12 text-base"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-white/70 text-sm">
              Don't have an account?{' '}
              <button className="text-orange-300 hover:text-orange-200 font-medium transition-colors underline-offset-4 hover:underline">
                Sign Up
              </button>
            </p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-orange-300 font-medium mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-white/70">
                  <p><strong className="text-white/90">Employee:</strong> john.doe@company.com / password</p>
                  <p><strong className="text-white/90">Admin:</strong> admin@company.com / password</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
