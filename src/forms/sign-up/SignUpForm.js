import Input from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";

export default function SignUpForm() {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-3 p-6 bg-neutral-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-slate-200 mb-2">Sign Up</h1>
      <p className="text-slate-400 mb-6 text-center">
        Create an account to get started.
      </p>
      <Input placeholder="Name" type="text" />
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Button className={"w-32"}>Sign Up</Button>
    </div>
  );
}
