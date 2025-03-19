import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth"
import { User } from "better-auth";
import { Activity, BarChart2, CalendarDays, CalendarIcon, ChevronLeft, ChevronRight, Clock, Droplets, Scale, TrendingUp, Utensils } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress";
import DashboardTab from "@/components/dashboard-tab";

export default async function Dashboard() {
	const session = await auth.api.getSession({
		headers: await headers()
	});

	if (!session) {
		return redirect("/");
	}

	const user = session.user as User;
	function getFirstName(user: User): string {
		return user.name.split(" ")[0];
	}

	const firstName = getFirstName(user);

	const today = new Date();
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const currentDay = today.getDay();

	const weekDates = Array.from({ length: 7 }, (_, i) => {
		const date = new Date()
		date.setDate(today.getDate() - currentDay + i)
		return {
			day: days[i],
			date: date.getDate(),
			month: date.toLocaleString("default", { month: "long" }),
			isCurrent: i === currentDay,
			dateString: date.toISOString().split("T")[0],
		}
	})

	return (
		<main className="px-4">
			<header className="flex flex-col gap-2">
				<h1 className="text-5xl font-bold tracking-tighter">Hello, {firstName}!</h1>
				<h2 className="text-[18px] text-zinc-600 font-medium tracking-tight flex gap-1.5 items-center">
					Today is <CalendarDays size={20} className="text-yellow-700" /> {weekDates[currentDay].day}, {weekDates[currentDay].month} {weekDates[currentDay].date} {new Date().getFullYear()}.
				</h2>
			</header>
			<section className="pt-8">
				<div className="flex gap-4">
					<Tabs defaultValue={weekDates[currentDay].dateString} className="w-full">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-semibold">Daily Summary</h2>
							<div className="flex items-center space-x-2">
								<Button variant="outline" size="icon">
									<ChevronLeft className="h-4 w-4" />
								</Button>
								<Button variant="outline" size="sm">
									<CalendarIcon className="mr-2 h-4 w-4" />
									Today
								</Button>
								<Button variant="outline" size="icon">
									<ChevronRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
						<TabsList className="w-full bg-muted/60 p-0 h-auto flex justify-between">
							{weekDates.map((date) => (
								<TabsTrigger
									key={date.dateString}
									value={date.dateString}
									className={`flex-1 pt-2 pb-3 flex flex-col items-center  ${date.isCurrent ? "bg-zinc-400 text-primary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" : ""}`}
								>
									<span className="text-xs font-normal">{date.day}</span>
									<span className="text-2xl font-bold">{date.date}</span>
									<span className="text-xs font-normal">{date.month}</span>
								</TabsTrigger>
							))}
						</TabsList>

						{/* Tab content for each date */}
						{weekDates.map((date) => (
							<DashboardTab date={date} key={date.dateString} />
						))}
					</Tabs>
				</div>
			</section>
		</main>
	)
}
