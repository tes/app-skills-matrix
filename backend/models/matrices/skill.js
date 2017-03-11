const skill = ({ id, name, criteria, type, questions }) => Object.freeze({
  id,
  get viewModel() {
    return { id, name };
  },
  get evaluationData() {
    return { id, name, criteria, type, questions }
  }
});

module.exports = skill;
module.exports.newSkill = (id, name, criteria, questions) =>
  ({
    id,
    name,
    criteria,
    questions,
    createdDate: new Date()
  });
