import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import {
getUserWorkspace,
getWorkspaceSpace,
} from "@/lib/onboarding";

export default async function OnboardingPage() {
const user = await getCurrentUser();

const workspace =
await getUserWorkspace(user.id);

if (!workspace) {
redirect("/onboarding/workspace");
}

const space =
await getWorkspaceSpace(workspace.id);

if (!space) {
redirect(
`/onboarding/space?workspaceId=${workspace.id}`
);
}

redirect("/dashboard");
}
