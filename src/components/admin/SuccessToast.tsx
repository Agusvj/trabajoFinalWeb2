type SuccessToastProps = {
  isOpen: boolean;
  message: string;
};

export default function SuccessToast({ isOpen, message }: SuccessToastProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-[60] animate-fade-in">
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
}
