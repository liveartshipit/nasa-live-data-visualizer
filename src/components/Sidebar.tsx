import { Link, useLocation } from 'react-router-dom';
import { RocketIcon, GlobeIcon, SunIcon, MenuIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const navItems = [
  { icon: RocketIcon, label: 'Asteroids', path: '/asteroids' },
  { icon: GlobeIcon, label: 'Earth Observation', path: '/earth' },
  { icon: SunIcon, label: 'Solar Data', path: '/solar' },
];

export function Sidebar({ isCollapsed, onToggle, isMobile }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-primary border-r border-border transition-all duration-300 ease-in-out z-40 ${
          isCollapsed ? 'w-0 md:w-20' : 'w-64'
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <h2 className="text-lg font-headline font-semibold text-primary-foreground">
                Data Sources
              </h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="bg-transparent text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
            >
              {isCollapsed ? <MenuIcon className="h-5 w-5" /> : <XIcon className="h-5 w-5" />}
            </Button>
          </div>

          <nav className="flex-1 py-4">
            <TooltipProvider>
              <ul className="space-y-2 px-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <li key={item.path}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link to={item.path}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start gap-3 bg-transparent text-primary-foreground hover:bg-secondary hover:text-secondary-foreground ${
                                isActive ? 'bg-secondary text-secondary-foreground' : ''
                              } ${isCollapsed ? 'justify-center px-2' : 'px-4'}`}
                            >
                              <Icon className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} />
                              {!isCollapsed && (
                                <span className="font-normal">{item.label}</span>
                              )}
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent side="right">
                            <p className="text-sm text-foreground">{item.label}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </li>
                  );
                })}
              </ul>
            </TooltipProvider>
          </nav>
        </div>
      </aside>
    </>
  );
}
