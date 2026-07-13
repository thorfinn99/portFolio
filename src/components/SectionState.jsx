import { AlertTriangle, RefreshCw, InboxIcon } from 'lucide-react';

/**
 * Reusable SectionState component for:
 * - Loading spinner
 * - Error message with retry
 * - Empty state
 *
 * Props:
 *   loading   {boolean}  - show loading spinner
 *   error     {any}      - error object or message string; show error UI if truthy
 *   empty     {boolean}  - show empty state when data exists but is empty array
 *   onRetry   {function} - callback fired when user clicks "Retry"
 *   emptyMsg  {string}   - custom empty message
 */
const SectionState = ({
  loading,
  error,
  empty,
  onRetry,
  emptyMsg = 'No data available yet. Please add data from the admin panel.',
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-5">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-4 border-white border-opacity-5" />
          <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-t-accent-500 animate-spin" />
        </div>
        <p className="text-gray-500 text-sm animate-pulse">Loading data…</p>
      </div>
    );
  }

  if (error) {
    const msg =
      typeof error === 'string'
        ? error
        : error?.message || 'Unknown error occurred.';

    console.error('[SectionState] Data fetch error:', error);

    return (
      <div className="flex justify-center py-16">
        <div
          className="glass-card rounded-2xl p-8 max-w-md w-full text-center border border-red-500 border-opacity-20"
          style={{ background: 'rgba(239, 68, 68, 0.05)' }}
        >
          <div className="w-14 h-14 rounded-2xl bg-red-500 bg-opacity-10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-red-400" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">
            ⚠️ Unable to load data from the server
          </h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            {msg}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white text-sm font-medium transition-all shadow-lg"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex justify-center py-16">
        <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center border border-white border-opacity-5">
          <div className="w-14 h-14 rounded-2xl bg-white bg-opacity-5 flex items-center justify-center mx-auto mb-4">
            <InboxIcon size={28} className="text-gray-500" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Nothing here yet</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{emptyMsg}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default SectionState;
