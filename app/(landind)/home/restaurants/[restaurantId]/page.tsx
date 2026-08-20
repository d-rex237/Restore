// app/restaurants/[restaurantId]/page.tsx

import RestaurantMenu from "./restaurant-menu";

export default async function RestaurantMenuPage({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;
  return <RestaurantMenu restaurantId={restaurantId} />;
}
