
export default (projects, { text}) => {
  return projects.filter((project) => {
    const textMatch = project.projectName.toLowerCase().includes(text.toLowerCase());
    return textMatch;
  })
};