import FullList from "../model/FullList"

interface DOMList {
  ul: HTMLUListElement
  clear(): void
  render(FullList: FullList): void
}
export default class ListTemplate implements DOMList {
  ul: HTMLUListElement
  static instance: ListTemplate = new ListTemplate()
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement
  }
  clear(): void {
    this.ul.innerHTML = ""
  }
  render(fullList: FullList): void {
    this.clear() // to clear the previous render so it won't duplicate what we have
    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement
      li.className = "flex items-center pt-4 gap-4"

      const check = document.createElement("input") as HTMLInputElement
      check.type = "checkbox"
      check.className = "min-w-10 min-h-10 cursor-pointer peer break-all"
      check.id = item.id
      check.tabIndex = 0
      check.checked = item.checked
      li.append(check)

      check.addEventListener("change", () => {
        item.checked = !item.checked
        fullList.save()
      })

      const label = document.createElement("label") as HTMLLabelElement
      label.htmlFor = item.id
      label.textContent = item.item
      label.className = "peer-checked:line-through"
      li.append(label)

      const button = document.createElement("button") as HTMLButtonElement
      button.className =
        "rounded-lg min-w-12 min-h-12 bg-slate-50 text-slate-950 ml-auto text-center border border-slate-950 hover:text-red-600 focus:text-red-600"
      button.textContent = "X"
      li.append(button)

      button.addEventListener("click", () => {
        fullList.removeItem(item.id)
        this.render(fullList)
      })
      this.ul.append(li)
    })
  }
}
