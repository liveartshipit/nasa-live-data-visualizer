import { useState } from 'react';
import { SearchIcon, MoonIcon, SunIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useThemeStore } from '@/stores/themeStore';

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-primary border-b border-border z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-8">
        <div className="flex items-center gap-4">
          <h1 className="text-xl md:text-2xl font-headline font-bold text-primary-foreground">
            NASA Live Data Hub
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center relative">
            <SearchIcon className="absolute left-3 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <Input
              type="search"
              placeholder="SearchIcon data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 bg-secondary text-secondary-foreground border-border"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="bg-transparent text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <MoonIcon className="h-5 w-5" strokeWidth={1.5} />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="bg-transparent text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-tertiary text-tertiary-foreground">
                    <UserIcon className="h-4 w-4" strokeWidth={1.5} />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover text-popover-foreground">
              <DropdownMenuItem className="text-popover-foreground hover:bg-muted">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-popover-foreground hover:bg-muted">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-popover-foreground hover:bg-muted">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
