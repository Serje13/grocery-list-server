
type ChangesType = {
    id: number;
    createdAt: string | Date;
    groceryId: number | null;
}

export type GroceryType = {
    id: number;
    title: string;
  	status:number;
  	priority: number;
	userId: number | null;
}

export type GroceryTypeCombined = {
    id: number;
    title: string;
  	status:number;
  	priority: number;
	userId: number | null;
    changes: ChangesType[] | null;
}