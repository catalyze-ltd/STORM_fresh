import Button from "../components/Button.tsx"
import Input from "../components/Input.tsx";
import Label from "../components/Label.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/tabs.tsx";

export default function () {
  return (
    <Tabs defaultValue="login" class="m-auto w-[400px]">
      <TabsList loop={false}>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="create_account" disabled={true}>
          Create Account
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <div class="grid gap-2">
          <div class="grid gap-1">
            <Label class="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
            <Label class="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
            />
          </div>
          <Button type="submit">
            Sign In with Email
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="create_account">
        Not yet implemented...
      </TabsContent>
    </Tabs>
  );
}