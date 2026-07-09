import { notFound } from "next/navigation";

import MemberSettings from "@/components/space-members/detail/member-settings";
import { MOCK_MEMBERS } from "@/lib/mock/members";

type Props = {
  params: Promise<{
    memberId: string;
  }>;
};

export default async function SettingsPage({
  params,
}: Props) {
  const { memberId } = await params;

  const member = MOCK_MEMBERS.find(
    (m) => m.id === memberId
  );

  if (!member) {
    notFound();
  }

  return (
    <MemberSettings
      member={member}
    />
  );
}