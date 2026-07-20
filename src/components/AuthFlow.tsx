import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, X, Info, Square, CheckCircle2 } from "lucide-react";
import logo from '../assets/Vector (4).png'
import logo2 from '../assets/Image (51).png'

type View = "login" | "forgot" | "reset" | "updated";

function Logo() {
  return (
    <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
      <img src={logo} alt="" />
      
      Serenia
    </div>
  );
}

function LoginView({ onForgotPassword }: { onForgotPassword: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      navigate("/Dashboard");
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Image panel — hidden on mobile */}
      <div className="relative hidden md:block">
        <img
          src={logo2}
          alt="Serenia House"
          className="h-full w-full object-cover"
        />
        <div className="absolute left-8 top-8 text-white">
          <Logo />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-8 text-white">
          <h3 className="mb-2 text-xl font-semibold">Serenia House</h3>
          <p className="max-w-sm text-sm text-white/85">
            Every house is built with sincerity and enthusiasm to help
            families create moments together inside it.
          </p>
          <div className="mt-6 flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === 0 ? "w-10 bg-white" : "w-10 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 py-16 sm:px-16">
        {/* Logo shown on mobile only, since the image panel (with its own logo) is hidden */}
        <div className="mb-10 md:hidden">
          <Logo/>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <h1 className="mb-2 text-3xl font-semibold text-slate-900">
            Welcome back!
          </h1>
          <p className="mb-8 text-sm text-slate-500">
            Please log in to manage your properties and clusters
          </p>

          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={!email || !password}
              className="mt-2 rounded-lg bg-[#3a3f2e] py-3 text-sm w-full font-medium text-white transition-colors hover:bg-[#2e3224] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Login now
            </button>

            <button
              onClick={onForgotPassword}
              className="text-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Forgot password?
            </button>
          </div>

          <p className="mt-16 text-center text-xs text-slate-500">
            If you don&apos;t have an account, please{" "}
            <a href="#" className="font-medium text-slate-700 underline">
              contact
            </a>{" "}
            the system administrator to request access.
          </p>
        </div>
      </div>
    </div>
  );
}

function ForgotPasswordView({ onSent }: { onSent: () => void }) {
  const [email, setEmail] = useState("");
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-6 py-16 sm:py-24">
      <div className="mb-12">
        <Logo />
      </div>

      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-2xl font-semibold text-slate-900">
          Forgot password?
        </h1>
        <p className="mb-8 text-sm text-slate-500">
          Enter your registered email, and we&apos;ll send you a reset link
          to recover your account.
        </p>

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="mb-6 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <button
          onClick={onSent}
          className="mb-4 w-full rounded-lg bg-[#3a3f2e] py-3 text-sm font-medium text-white transition-colors hover:bg-[#2e3224]"
        >
          Send reset link
        </button>

        <button className="mb-10 w-full text-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
          Didn&apos;t get the link?
        </button>

        {showBanner && (
          <div className="relative rounded-lg border border-slate-200 bg-slate-50 p-4">
            <button
              onClick={() => setShowBanner(false)}
              aria-label="Dismiss"
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
            <div className="flex gap-2">
              <Info size={16} className="mt-0.5 shrink-0 text-slate-500" />
              <div>
                <p className="mb-1 text-sm font-semibold text-slate-800">
                  Important!
                </p>
                <p className="text-xs leading-relaxed text-slate-500">
                  Make sure you enter the correct email address, and if you
                  forget which email address you registered with, contact
                  the system administrator.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type Requirement = {
  label: string;
  test: (pw: string) => boolean;
};

const requirements: Requirement[] = [
  { label: "At least contain 1 symbol", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
  { label: "Minimum 8 characters", test: (pw) => pw.length >= 8 },
  { label: "At least contain 1 number", test: (pw) => /\d/.test(pw) },
  { label: "Using 1 capital letter", test: (pw) => /[A-Z]/.test(pw) },
];

function ResetPasswordView({ onUpdated }: { onUpdated: () => void }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const failedRequirement = useMemo(
    () => requirements.find((r) => !r.test(password)),
    [password]
  );

  const allValid = requirements.every((r) => r.test(password));
  const passwordsMatch =
    confirmPassword.length > 0 && confirmPassword === password;

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-6 py-16 sm:py-24">
      <div className="mb-12">
        <Logo />
      </div>

      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-2xl font-semibold text-slate-900">
          Reset your password
        </h1>
        <p className="mb-8 text-sm text-slate-500">
          Enter a new password for your Serenia Admin account.
        </p>

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Password
        </label>
        <div className="relative mb-1">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-11 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {password.length > 0 && failedRequirement && (
          <p className="mb-4 flex items-center gap-1 text-xs text-slate-500">
            <Info size={12} />
            Your password is not using {failedRequirement.label.toLowerCase()}
          </p>
        )}

        <div className="mb-6 mt-3">
          <p className="mb-3 text-sm font-medium text-slate-700">
            Make sure your password is :
          </p>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            {requirements.map((req) => {
              const valid = password.length > 0 && req.test(password);
              return (
                <div key={req.label} className="flex items-center gap-2 text-xs">
                  {valid ? (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-white">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white">
                      <X size={10} strokeWidth={3} />
                    </span>
                  )}
                  <span className="text-slate-600">{req.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Confirm password
        </label>
        <div className="relative mb-8">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-11 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((s) => !s)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          onClick={onUpdated}
          disabled={!allValid || !passwordsMatch}
          className="w-full rounded-lg bg-[#3a3f2e] py-3 text-sm font-medium text-white transition-colors hover:bg-[#2e3224] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Update password
        </button>
      </div>
    </div>
  );
}

function PasswordUpdatedView({ onBackToLogin }: { onBackToLogin: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-6 py-16 sm:py-24">
      <div className="mb-12">
        <Logo />
      </div>

      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <CheckCircle2
          size={72}
          className="mb-6 text-[#3a3f2e]"
          strokeWidth={1.5}
        />
        <h1 className="mb-2 text-2xl font-semibold text-slate-900">
          Password updated!
        </h1>
        <p className="mb-10 text-sm text-slate-500">
          Your password has been reset. You can now use your new credentials
          to log in.
        </p>

        <button
          onClick={onBackToLogin}
          className="w-full rounded-lg bg-[#3a3f2e] py-3 text-sm font-medium text-white transition-colors hover:bg-[#2e3224]"
        >
          Back to login
        </button>
      </div>
    </div>
  );
}

export default function AuthFlow() {
  const [view, setView] = useState<View>("login");

  switch (view) {
    case "login":
      return <LoginView onForgotPassword={() => setView("forgot")} />;
    case "forgot":
      return <ForgotPasswordView onSent={() => setView("reset")} />;
    case "reset":
      return <ResetPasswordView onUpdated={() => setView("updated")} />;
    case "updated":
      return <PasswordUpdatedView onBackToLogin={() => setView("login")} />;
    default:
      return null;
  }
}