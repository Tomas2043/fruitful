import { DashboardBreadcrumbs } from "@/components/dashboard-breadcrumbs";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { User } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function RootLayout({ 
	children
}: {
	children: React.ReactNode
}) {
	const session = await auth.api.getSession({
		headers: await headers()
	});

	if (!session) {
		return redirect("/");
	}

	const user = session.user as User;
	return (
		<SidebarProvider>
			<AppSidebar currentUser={user} />
			<SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DashboardBreadcrumbs />
          </div>
        </header>
				<main className="p-4">
					{children}
				</main>
      </SidebarInset>
		</SidebarProvider>
	)
}
