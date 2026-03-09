const KEY = "plans";

export const getPlans = () =>
  JSON.parse(localStorage.getItem(KEY)) || [];

export const savePlans = (plans) =>
  localStorage.setItem(KEY, JSON.stringify(plans));

export const addPlan = (plan) => {
  const plans = getPlans();
  plans.push(plan);
  savePlans(plans);
};

export const updatePlan = (id, updated) => {
  const plans = getPlans().map(p => p.id===id ? updated : p);
  savePlans(plans);
};

export const deletePlan = (id) => {
  const plans = getPlans().filter(p => p.id!==id);
  savePlans(plans);
};