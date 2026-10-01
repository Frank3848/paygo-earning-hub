import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT = {
  title: 'PayGo — Financial Rewards, Airtime & Data Services',
  description: 'Earn rewards, buy airtime and data, and transfer money with PayGo, your simple digital wallet.',
};

const META: Record<string, { title: string; description: string }> = {
  '/': { title: 'Create Your PayGo Account — Earn & Withdraw', description: 'Sign up for PayGo to claim your welcome bonus, buy airtime and data, and withdraw rewards.' },
  '/login': { title: 'Log In to PayGo — Your Digital Wallet', description: 'Log in to your PayGo account to check your balance, transfer money and buy airtime.' },
  '/verify-otp': { title: 'Verify Your Email — PayGo', description: 'Enter the 6-digit code sent to your email to finish creating your PayGo account.' },
  '/home': { title: 'PayGo Dashboard — Balance & Quick Actions', description: 'View your PayGo balance, recent transactions, promotions and quick actions.' },
  '/airtime': { title: 'Buy Airtime on PayGo — All Networks', description: 'Top up airtime instantly for MTN, Airtel, Glo and 9mobile with PayGo.' },
  '/data': { title: 'Buy Data Bundles on PayGo', description: 'Purchase affordable data plans for all major Nigerian networks with PayGo.' },
  '/transfer': { title: 'Send Money with PayGo Transfer', description: 'Transfer money to any bank account quickly and securely with PayGo.' },
  '/support': { title: 'PayGo Support — Get Help Fast', description: 'Chat with PayGo support for help with your account, payments and transfers.' },
  '/communities': { title: 'Join PayGo Communities', description: 'Join the PayGo WhatsApp and Telegram communities for updates and tips.' },
  '/earn-more': { title: 'Earn More with PayGo Rewards', description: 'Discover referral bonuses and promotions to earn more with PayGo.' },
  '/watch': { title: 'PayGo Watch — Stream Movies & TV', description: 'Stream movies, live TV and trending shows with PayGo Watch.' },
  '/profile': { title: 'Your PayGo Profile', description: 'Manage your PayGo profile, account details and settings.' },
  '/buy-pay-id': { title: 'Buy a PAY ID — PayGo', description: 'Purchase your PayGo PAY ID to unlock withdrawals and all app features.' },
  '/upgrade/benefits': { title: 'Upgrade Your PayGo Membership', description: 'See the benefits of upgrading your PayGo membership tier.' },
};

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export const RouteMeta = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = META[pathname] ?? DEFAULT;
    const url = `https://paygo-essence.lovable.app${pathname}`;
    document.title = m.title;
    setMeta('name', 'description', m.description);
    setMeta('property', 'og:title', m.title);
    setMeta('property', 'og:description', m.description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', m.title);
    setMeta('name', 'twitter:description', m.description);
  }, [pathname]);
  return null;
};
