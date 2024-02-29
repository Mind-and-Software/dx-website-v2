"use client";
import { useAuth } from "@/AuthContext/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const Page = () => {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await auth.signIn(values.email, values.password);
        router.push("/account");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "No account with given email found or the password is incorrect.",
        });
        console.log(error);
      }
    },
  });
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            You can delete your account from here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
            </div>
            <Button className="w-full mt-4" type="submit">
              Log in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
