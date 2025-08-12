// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  // Redireciona para login por padrão
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
  return null;
};

export default Index;
