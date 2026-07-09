import { notFound } from "next/navigation";

import MemberFiles from "@/components/space-members/detail/member-files";
import { MOCK_MEMBERS } from "@/lib/mock/members";

type Props = {
  params: Promise<{
    memberId: string;
  }>;
};

export default async function FilesPage({
  params,
}: Props) {
  const { memberId } = await params;

  const member = MOCK_MEMBERS.find(
    (m) => m.id === memberId
  );

  if (!member) {
    notFound();
  }

  // TODO:
  // Replace with Prisma query
  const files = [
    {
      id: "1",
      name: "Landing.fig",
      type: "FIG",
      size: "8.2 MB",
      uploadedAt: "2026-07-01",
    },
    {
      id: "2",
      name: "Dashboard.png",
      type: "PNG",
      size: "1.8 MB",
      uploadedAt: "2026-07-03",
    },
    {
      id: "3",
      name: "Requirements.pdf",
      type: "PDF",
      size: "640 KB",
      uploadedAt: "2026-07-05",
    },
  ];

  return (
    <MemberFiles
      member={member}
      files={files}
    />
  );
}