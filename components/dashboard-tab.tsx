import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, BarChart2, CalendarIcon, ChevronLeft, ChevronRight, Clock, Droplets, Scale, TrendingUp, Utensils } from "lucide-react";
import { Progress } from "./ui/progress";

type WeekDate = {
	dateString: string;
	day: string;
	date: number;
	month: string;
	isCurrent: boolean;
};
import { Button } from "@/components/ui/button"

export default function DashboardTab({
	date
}: {
	date: WeekDate
}) {
	return (
				<TabsContent key={date.dateString} value={date.dateString} className="mt-4">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						{/* Calories Card */}
						<Card>
							<CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
								<CardTitle className="text-base font-medium">Calories</CardTitle>
								<BarChart2 className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">1,352 / 2,000</div>
								<div className="text-xs text-muted-foreground">648 calories remaining</div>
								<div className="mt-3">
									<Progress value={67} className="h-2" />
								</div>
								<div className="mt-3 grid grid-cols-3 gap-2 text-xs">
									<div className="flex flex-col items-center p-2 bg-primary/10 rounded-md">
										<span className="font-medium text-foreground">Carbs</span>
										<span className="font-bold text-sm">145g</span>
										<span className="text-muted-foreground">43%</span>
									</div>
									<div className="flex flex-col items-center p-2 bg-blue-500/10 rounded-md">
										<span className="font-medium text-foreground">Protein</span>
										<span className="font-bold text-sm">95g</span>
										<span className="text-muted-foreground">28%</span>
									</div>
									<div className="flex flex-col items-center p-2 bg-yellow-500/10 rounded-md">
										<span className="font-medium text-foreground">Fat</span>
										<span className="font-bold text-sm">45g</span>
										<span className="text-muted-foreground">29%</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Steps Card */}
						<Card>
							<CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
								<CardTitle className="text-base font-medium">Steps</CardTitle>
								<Activity className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">6,540</div>
								<div className="text-xs text-muted-foreground">Goal: 10,000 steps</div>
								<div className="mt-3">
									<Progress value={65} className="h-2" />
								</div>
								<div className="mt-4 text-sm">
									<div className="flex justify-between">
										<span className="text-muted-foreground">Distance</span>
										<span>4.8 km</span>
									</div>
									<div className="flex justify-between mt-1">
										<span className="text-muted-foreground">Floors</span>
										<span>7</span>
									</div>
									<div className="flex justify-between mt-1">
										<span className="text-muted-foreground">Active Minutes</span>
										<span>42</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Water Card */}
						<Card>
							<CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
								<CardTitle className="text-base font-medium">Water</CardTitle>
								<Droplets className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">5 glasses</div>
								<div className="text-xs text-muted-foreground">Goal: 8 glasses (2L)</div>
								<div className="mt-3">
									<Progress value={62} className="h-2" />
								</div>
								<div className="mt-4 flex justify-between items-center">
									<div className="grid grid-cols-8 gap-1 flex-1">
										{[...Array(8)].map((_, i) => (
											<div key={i} className={`h-8 rounded-md ${i < 5 ? "bg-blue-500" : "bg-muted"}`} />
										))}
									</div>
									<Button size="sm" variant="outline" className="ml-2">
										<span className="sr-only">Add Water</span>
										<Droplets className="h-4 w-4" />
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Weight Card */}
						<Card>
							<CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
								<CardTitle className="text-base font-medium">Weight</CardTitle>
								<Scale className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">68.5 kg</div>
								<div className="text-xs text-muted-foreground flex items-center">
									<TrendingUp className="h-3 w-3 text-green-500 mr-1" />
									<span className="text-green-500 mr-1">-0.5 kg</span>
									<span>this week</span>
								</div>
								<div className="mt-4 pt-2 border-t">
									<div className="flex justify-between text-sm">
										<span className="text-muted-foreground">Target</span>
										<span>65 kg</span>
									</div>
									<div className="flex justify-between mt-1 text-sm">
										<span className="text-muted-foreground">Started</span>
										<span>75 kg</span>
									</div>
									<div className="mt-2">
										<Progress value={65} className="h-2" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-6 mt-6 md:grid-cols-2">
						{/* Meals Card */}
						<Card className="h-full pb-0">
							<CardHeader>
								<CardTitle>Today&apos;s Meals</CardTitle>
								<CardDescription>
									Track your food intake for {date.day}, {date.date} {date.month}
								</CardDescription>
							</CardHeader>
							<CardContent className="p-0 h-full">
								<div className="divide-y">
									<div className="flex items-center justify-between p-4">
										<div className="flex items-center space-x-4">
											<div className="bg-muted rounded-md p-2">
												<Clock className="h-4 w-4" />
											</div>
											<div>
												<p className="text-sm font-medium">Breakfast</p>
												<p className="text-xs text-muted-foreground">Oatmeal with banana and honey</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-sm font-medium">315 cal</p>
											<p className="text-xs text-muted-foreground">08:30 AM</p>
										</div>
									</div>

									<div className="flex items-center justify-between p-4">
										<div className="flex items-center space-x-4">
											<div className="bg-muted rounded-md p-2">
												<Clock className="h-4 w-4" />
											</div>
											<div>
												<p className="text-sm font-medium">Lunch</p>
												<p className="text-xs text-muted-foreground">Grilled chicken salad with avocado</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-sm font-medium">425 cal</p>
											<p className="text-xs text-muted-foreground">12:45 PM</p>
										</div>
									</div>

									<div className="flex items-center justify-between p-4">
										<div className="flex items-center space-x-4">
											<div className="bg-muted rounded-md p-2">
												<Clock className="h-4 w-4" />
											</div>
											<div>
												<p className="text-sm font-medium">Snack</p>
												<p className="text-xs text-muted-foreground">Greek yogurt with berries</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-sm font-medium">185 cal</p>
											<p className="text-xs text-muted-foreground">03:30 PM</p>
										</div>
									</div>

									<div className="flex items-center justify-between p-4">
										<div className="flex items-center space-x-4">
											<div className="bg-muted rounded-md p-2">
												<Clock className="h-4 w-4" />
											</div>
											<div>
												<p className="text-sm font-medium">Dinner</p>
												<p className="text-xs text-muted-foreground">
													Salmon with quinoa and steamed vegetables
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-sm font-medium">427 cal</p>
											<p className="text-xs text-muted-foreground">07:15 PM</p>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter className="border-t bg-muted/50 py-4">
								<Button className="w-full">
									<Utensils className="mr-2 h-4 w-4" />
									Add Meal
								</Button>
							</CardFooter>
						</Card>

						{/* Activity and Achievements Card */}
						<div className="space-y-6">
							{/* Activity Timeline */}
							<Card className="pb-0">
								<CardHeader>
									<CardTitle>Activity</CardTitle>
									<CardDescription>Your activity for the day</CardDescription>
								</CardHeader>
								<CardContent className="p-0">
									<div className="space-y-0 divide-y">
										<div className="flex items-center justify-between p-4">
											<div className="flex items-center space-x-4">
												<div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-md p-2">
													<Activity className="h-4 w-4" />
												</div>
												<div>
													<p className="text-sm font-medium">Morning Run</p>
													<p className="text-xs text-muted-foreground">5 km in 28 minutes</p>
												</div>
											</div>
											<div className="text-right">
												<p className="text-sm font-medium">320 cal</p>
												<p className="text-xs text-muted-foreground">06:30 AM</p>
											</div>
										</div>

										<div className="flex items-center justify-between p-4">
											<div className="flex items-center space-x-4">
												<div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-md p-2">
													<Activity className="h-4 w-4" />
												</div>
												<div>
													<p className="text-sm font-medium">Afternoon Walk</p>
													<p className="text-xs text-muted-foreground">2 km during lunch break</p>
												</div>
											</div>
											<div className="text-right">
												<p className="text-sm font-medium">110 cal</p>
												<p className="text-xs text-muted-foreground">01:15 PM</p>
											</div>
										</div>
									</div>
								</CardContent>
								<CardFooter className="border-t bg-muted/50 py-4">
									<Button variant="outline" className="w-full">
										<Activity className="mr-2 h-4 w-4" />
										Record Activity
									</Button>
								</CardFooter>
							</Card>

							{/* Achievements */}
							<Card>
								<CardHeader>
									<CardTitle>Achievements</CardTitle>
									<CardDescription>Your recent milestones</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-3 gap-3">
										<div className="flex flex-col items-center bg-muted/50 rounded-lg p-3 text-center">
											<div className="bg-primary/10 p-2 rounded-full mb-2">
												<Activity className="h-5 w-5 text-primary" />
											</div>
											<span className="text-xs font-medium">7-Day Streak</span>
										</div>
										<div className="flex flex-col items-center bg-muted/50 rounded-lg p-3 text-center">
											<div className="bg-primary/10 p-2 rounded-full mb-2">
												<TrendingUp className="h-5 w-5 text-primary" />
											</div>
											<span className="text-xs font-medium">5kg Lost</span>
										</div>
										<div className="flex flex-col items-center bg-muted/50 rounded-lg p-3 text-center">
											<div className="bg-primary/10 p-2 rounded-full mb-2">
												<Droplets className="h-5 w-5 text-primary" />
											</div>
											<span className="text-xs font-medium">Hydration Pro</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</TabsContent>
	)
}
