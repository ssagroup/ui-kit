export const useReadMutation = () => {
  const handleMutate = () => {
    /**
     * no-op
     */
  };
  return {
    isPending: false,
    mutate: handleMutate,
  };
};
