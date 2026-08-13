import { Link } from 'react-router-dom';

export const NeedHelp = () => {
  return (
    <Link 
      to="/help" 
      className="text-link text-sm font-medium hover:underline"
    >
      Need Help?
    </Link>
  );
};
