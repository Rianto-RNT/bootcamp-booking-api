function find_max(nums) {
  let max_num = Number.NEGATIVE_INFINITY; // smaller than all other numbers
  for (let num of nums) {
    if (num > max_num) {
      // Missing line
      max_num = num;
    }
  }
  return console.log(max_num);
}

console.log(find_max([2, 5, 67, 3, 8, 9]));
