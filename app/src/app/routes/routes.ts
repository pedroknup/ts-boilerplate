enum Permission {
  PUBLIC,
  PRIVATE,
  ADMIN
}

interface IRoute {
  visibleSidebar?: boolean;
  name?: string;
  icon?: string;
  url: string;
  permission?: Permission;
}
