type UseReadMutationProps = {
  onSuccess: () => void;
};

export const useReadManyMutation = ({ onSuccess }: UseReadMutationProps) => {
  const handleMutate = (ids: number[]) => {
    /**
     * no-op
     */
    console.log('>>>read many mutations, ids', ids);
    return {
      error: null,
      result: null,
      success: true,
      targetUrl: null,
      unAuthorizedRequest: false,
      __abp: true,
    };
  };
  return {
    mutate: handleMutate,
    onSuccess,
  };
};
