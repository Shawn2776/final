import React from "react";
import { Button } from "../button";
import Link from "next/link";

const DashboardSectionHeader = ({ section, action, label }) => {
  return (
    <div className="w-full justify-end flex mb-10">
      <Button>
        <Link href={`/dashboard/${section}/${action}`}>{label}</Link>
      </Button>
    </div>
  );
};

export default DashboardSectionHeader;
