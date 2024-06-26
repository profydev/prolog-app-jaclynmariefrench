import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Routes } from "@config/routes";
import classNames from "classnames";
import { NavigationContext } from "./navigation-context";
import { MenuItemButton } from "./menu-item-button";
import { MenuItemLink } from "./menu-item-link";
import styles from "./sidebar-navigation.module.scss";
import { UnstyledButton } from "@features/ui";

const menuItems = [
  { text: "Projects", iconSrc: "/icons/projects.svg", href: Routes.projects },
  { text: "Issues", iconSrc: "/icons/issues.svg", href: Routes.issues },
  { text: "Alerts", iconSrc: "/icons/alert.svg", href: Routes.alerts },
  { text: "Users", iconSrc: "/icons/users.svg", href: Routes.users },
  { text: "Settings", iconSrc: "/icons/settings.svg", href: Routes.settings },
];

type SidebarNavigationProps = {
  className?: string;
};

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const router = useRouter();
  const { isSidebarCollapsed, toggleSidebar } = useContext(NavigationContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  //State for if it's mobile view or not and accounts for the server side rendering delay
  const [isMobileView, setIsMobileView] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 1023px)").matches
      : false,
  );

  //comment from Johannes An alternative to checking the window width would be to use matchMedia.
  //There's actually a ready-made hook in on GitHub that could act as inspiration 😄
  //And btw I usually try to get around JS media queries where possible and use CSS instead

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobileView(window.matchMedia("(max-width: 1023px)").matches);
    };

    window.addEventListener("resize", handleWindowResize);

    //Cleans event listener
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  //comment from Johannes The useEffect only runs in the browser so it should be ok to remove the typeof window !== 'undefined check

  return (
    <div
      className={classNames(
        styles.container,
        isSidebarCollapsed && styles.isCollapsed,
        className,
      )}
    >
      <div
        className={classNames(
          styles.fixedContainer,
          isSidebarCollapsed && styles.isCollapsed,
        )}
      >
        <header className={styles.header}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              isMobileView
                ? "/icons/logo-large.svg"
                : isSidebarCollapsed
                  ? "/icons/logo-small.svg"
                  : "/icons/logo-large.svg"
            }
            alt="logo"
            className={styles.logo}
          />
          <UnstyledButton
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.menuButton}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
              alt={isMobileMenuOpen ? "close menu" : "open menu"}
              className={styles.menuIcon}
            />
          </UnstyledButton>
        </header>
        <div
          className={classNames(
            styles.menuOverlay,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        />
        <nav
          className={classNames(
            styles.nav,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        >
          <ul className={styles.linkList} data-testid="sidebar-navigation">
            {menuItems.map((menuItem, index) => (
              <MenuItemLink
                key={index}
                {...menuItem}
                isCollapsed={isSidebarCollapsed}
                isActive={router.pathname === menuItem.href}
              />
            ))}
          </ul>
          <ul className={styles.list} data-testid="sidebar-navigation">
            <MenuItemLink
              text="Support"
              iconSrc="/icons/support.svg"
              isCollapsed={isSidebarCollapsed}
              href="mailto:support@prolog-app.com?subject=Support Request: "
              isActive={false}
            />
            <MenuItemButton
              text="Collapse"
              iconSrc="/icons/arrow-left.svg"
              isCollapsed={isSidebarCollapsed}
              onClick={() => toggleSidebar()}
              className={classNames(
                styles.collapseMenuItem,
                isSidebarCollapsed && styles.arrowFlipped,
              )}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
}
