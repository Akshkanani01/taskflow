import { notFound } from "next/navigation";

import MemberActivity from "@/components/space-members/detail/member-activity";
import { MOCK_MEMBERS } from "@/lib/mock/members";

type Props = {
  params: Promise<{
    memberId: string;
  }>;
};

export default async function ActivityPage({
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
    <MemberActivity
      member={member}
    />
  );
}