import { notFound } from "next/navigation";

import MemberPermissions from "@/components/space-members/detail/member-permissions";
import { MOCK_MEMBERS } from "@/lib/mock/members";

type Props = {
  params: Promise<{
    memberId: string;
  }>;
};

export default async function PermissionsPage({
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
    <MemberPermissions
      member={member}
    />
  );
}