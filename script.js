function blogNav(el){
    // Deactivate all buttons with the class "myButton"
    const items1 = [
        { date: "10/17/2018", title: "climbing1", summary:"summary1" },
        { date: "10/18/2018", title: "climbing2", summary:"summary2" },
      ];
      const items2 = [
        { date: "10/17/2019", title: "book1", summary:"summary1" },
        { date: "10/18/2019", title: "books2", summary:"summary2" },
      ];

    var button = el
    console.log(el)
    
    let comp = el.id.localeCompare("climbingBlogButton");
    if(comp == 0){
        console.log("climbing button")
        loadTableData(items1);
        loadTableData([]);
    }

    comp = el.id.localeCompare("booksBlogButton");
    if(comp == 0){
        console.log("books button")
        loadTableData(items2);
        loadTableData([]);
    }

      
}
        


function loadTableData(items) {

    const table = document.getElementById("testBody");
    items.forEach( item => {
      let row = table.insertRow();
      let date = row.insertCell(0);
      date.innerHTML = item.date;
      let title = row.insertCell(1);
      title.innerHTML = item.title;
      let summary = row.insertCell(2);
      summary.innerHTML = item.summary;
    });
  
  }