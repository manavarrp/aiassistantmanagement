"use client";


import { CreateAssistant } from "@/components/iaassistant/create-assistant";
import { DeleteAssistant } from "@/components/iaassistant/delete-assistant";
import { EditAssistant } from "@/components/iaassistant/edit-assistant";

import { useEffect, useState } from "react";

export const ModalProvider = () => {

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <CreateAssistant />
      <EditAssistant />
      <DeleteAssistant />
    </>
  );
};
