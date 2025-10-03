"use client";

import { useCallback, useState } from "react";

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setIsConfirmed(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const confirmModal = useCallback(() => {
    setIsConfirmed(true);
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    isConfirmed,
    openModal,
    closeModal,
    confirmModal,
  };
}
