type UseReadMutationProps = {
  onSuccess: () => void;
};

export const useReadManyMutation = ({ onSuccess }: UseReadMutationProps) => {
  const handleMutate = (ids: number[]) => {
    // Additional logic
    return {
      ids,
      error: null,
      result: null,
      success: true,
      targetUrl: null,
      unAuthorizedRequest: false,
    };
  };
  return {
    mutate: handleMutate,
    onSuccess,
  };
};
