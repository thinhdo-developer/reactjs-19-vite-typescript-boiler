import Button from "@/components/button";
import useAuth from "@/hooks/useAuth";
import authServices from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function LoginPage() {
  const { handleLoginSuccess } = useAuth();

  const mutation = useMutation({
    mutationFn: authServices.login,
    onSuccess: ({ data }) => {
      handleLoginSuccess(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      username: name,
      password,
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          user name
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" fullWidth isLoading={mutation.isPending}>
          Sign in
        </Button>
      </div>
    </form>
  );
}
