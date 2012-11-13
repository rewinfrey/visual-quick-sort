class QuickSort
  constructor: (@canvas_height, @canvas_width, @stroke)->
    this.data            = []
    this.sorted          = []
    this.animation_list  = new LinkedList()
    this.canvas_height   = @canvas_height
    this.canvas_width    = @canvas_width
    this.stroke          = @stroke
    
  construct_array: ->
    while this.data.length < (parseInt(this.canvas_width / this.stroke))
      this.data.push(new Node(this.data.length, parseInt((Math.random() * 1000 % this.canvas_height))))
      # this.data.push(parseInt((Math.random() * 1000 % this.canvas_height - 50) + 50))

  exchange: (index1, index2) ->
    this.animation_list.add_animation_node(this.data[index1], "swap")
    this.animation_list.add_animation_node(this.data[index2], "swap")
    temp                = this.data[index2]
    this.data[index2]   = this.data[index1]
    this.data[index2].x = index2
    this.data[index1]   = temp
    this.data[index1].x = index1
    this.animation_list.add_animation_node(this.data[index1], "unsorted")
    this.animation_list.add_animation_node(this.data[index2], "unsorted")

  find_pivot: (left, right) ->
    # this.animation_list.add_animation_nodes(left, right, this.data, this.canvas_height)
    middle       = Math.floor((left + right) / 2)
    middle_value = this.data[middle].y
    left_value   = this.data[left].y
    right_value  = this.data[right].y
    this.animation_list.add_animation_node(this.data[left], "possible_pivot")
    this.animation_list.add_animation_node(this.data[right], "possible_pivot")
    this.animation_list.add_animation_node(this.data[middle], "possible_pivot")
    this.animation_list.add_animation_node(this.data[left], "possible_pivot")
    this.animation_list.add_animation_node(this.data[right], "possible_pivot")
    this.animation_list.add_animation_node(this.data[middle], "possible_pivot")
    if left_value > middle_value
      this.exchange(left, middle)
    if left_value > right_value
      this.exchange(left, right)
    if middle_value > right_value
      this.exchange(middle, right)
    this.exchange(left, middle)
    this.animation_list.add_animation_node(this.data[left], "pivot")
    this.animation_list.add_animation_node(this.data[right], "unsorted")
    this.animation_list.add_animation_node(this.data[middle], "unsorted")
    return this.data[left].y

  quick_sort: (left, right) ->
    console.log "left: "+left+" right: "+right
    console.log this.data
    this.count += 1
    if (right - left) > 2
      pivot       = this.find_pivot(left, right)
      sort_left   = left + 1
      sort_right  = right
      while sort_left <= sort_right
        while sort_left < this.data.length - 1 && this.data[sort_left].y < pivot
          this.animation_list.add_animation_node(this.data[sort_left], "iteration")
          this.animation_list.add_animation_node(this.data[sort_left], "unsorted")
          sort_left += 1
          console.log "sort_left: "+sort_left
          console.log "length: "+this.data.length
        while this.data[sort_right].y > pivot
          this.animation_list.add_animation_node(this.data[sort_right], "iteration")
          this.animation_list.add_animation_node(this.data[sort_right], "unsorted")
          sort_right -= 1
        if sort_left <= sort_right
          this.exchange(sort_left, sort_right)
          sort_left += 1
          sort_right -= 1
      this.exchange(sort_left - 1, left)
      if left < sort_right
        this.quick_sort(left, sort_right)
      if sort_left < right
        this.quick_sort(sort_left, right)
    else
      this.quick_insertion(left, right)
  
  quick_insertion: (left, right) ->
    console.log "insertion!"
    if right - left > 0
      range   = right - left + 1
      min     = left
      count   = 0
      while count < range
        if this.data[left + count].y < this.data[min].y
          min = left + count
        count += 1
      this.exchange(min, left)
      this.animation_list.add_animation_node(this.data[left], "sorted")
      this.quick_insertion(left + 1, right)

  first_unsorted_index: ->
    for element, index in this.data
      if element.state == "unsorted"
        return index
    return null
  
  swap_elements: (minimum) ->
    first       = this.first_unsorted_index()
    first_y     = this.data[first].y

    this.animation_list.add_animation_node(this.data[first], "swap")
    this.animation_list.add_animation_node(this.data[minimum], "swap")
    this.animation_list.add_animation_node(this.data[first], "swap")
    this.animation_list.add_animation_node(this.data[minimum], "swap")

    this.data[first].y     = this.data[minimum].y
    this.data[minimum].y   = first_y
    this.data[first].state = "sorted"

    this.animation_list.add_animation_node(this.data[first], "swap")
    this.animation_list.add_animation_node(this.data[minimum], "swap")
    this.animation_list.add_animation_node(this.data[first], "swap")
    this.animation_list.add_animation_node(this.data[minimum], "swap")

    if minimum == first
      this.animation_list.add_animation_node(this.data[first], "sorted")
    else
      this.animation_list.add_animation_node(this.data[minimum], "unsorted")
      this.animation_list.add_animation_node(this.data[first], "sorted")

class Node
  constructor: (@x, @y) ->
    this.x     = @x
    this.y     = @y
    this.prev  = null
    this.next  = null
    this.state = "unsorted"
    
  copy: ->
    temp_node = new Node(this.x, this.y)
    temp_node.prev = this.prev
    temp_node.next = this.next
    return temp_node

class LinkedList
  constructor: ->
    this.first  = null
    this.last   = null
    this.length = 0
    this.max    = 0

  # Specific to selection sort. Swap the found minimum node with the first node in the list
  selection_sort_swap: (min, sorted_list, animation_list) ->
    length = 0
    node   = this.first
    while length < this.length
      if min.x == node.x && min.y == node.y

        animation_list.add_animation_node(this.first, "swap")
        animation_list.add_animation_node(min, "swap")               

        min.y        = this.first.y
        this.first.y = node.y

        animation_list.add_animation_node(this.first, "swapped")
        animation_list.add_animation_node(min, "swapped")
        animation_list.add_animation_node(this.first, "unsorted")
        animation_list.add_animation_node(min, "unsorted")
        return
      node = node.prev
      length += 1

  # set the first pointer to the second node in the linked list, return the first node and reduce the length by one
  remove_node: (node) ->
    if this.length > 1
      if node == this.first
        this.first = node.prev
      if node == this.last
        this.last  = node.next
    else
      this.first = null
      this.last  = null
    node.prev = null
    node.next = null
    this.length -= 1
  
  # adds a new node to a linked list. first node is "next" to last node
  # first_node.prev -> second_node.prev -> third_node ...
  # first_node <- second_node.next <- third_node.next
  add_node: (node) ->
    if this.length == 0
      node.prev  = node
      node.next  = node
      this.first = node
      this.last  = node
    else
      this.first.next = node
      this.last.prev  = node
      node.prev       = this.first
      node.next       = this.last
      this.last       = node
    this.length += 1
    
  # checks if the linked list is empty (meaning the linked list length is == 0)
  is_empty: ->
    return this.length == 0

  add_animation_node: (node, state) ->
    temp_node       = new Node(node.x, node.y)
    temp_node.state = state
    this.add_node(temp_node)

  add_animation_nodes: (left, right, data, canvas_height) ->
    range = right - left
    count = 0
    while count < range
      node = new Node(left + count, canvas_height - data[left + count].y)
      this.add_animation_node(node, "range")
      count += 1
      
class Animate
  constructor: (@id, @canvas_height, @canvas_width, @stroke, @frame_rate) ->
    this.ctx        = document.getElementById("#{@id}").getContext("2d")
    this.height     = @canvas_height
    this.width      = @canvas_width
    this.stroke     = @stroke
    this.list_size  = 0
    this.frame_rate = @frame_rate

  reset_canvas: ->
    this.ctx.clearRect(0, 0, this.height, this.width)

  get_list_size: (linked_list) ->
    this.list_size = linked_list.length

  draw_linked_list: (linked_list) ->
    length = 0
    current_node = linked_list.first
    while length < linked_list.length
      this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height)
      this.ctx.fillStyle = "rgb(45,123,200)"
      this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y)
      current_node = current_node.prev
      length += 1

  draw_array: (array) ->
    for element, element_index in array
      this.ctx.clearRect(element.x * this.stroke, 0, this.stroke, this.height)
      this.ctx.fillStyle = "rgb(45,123,200)"
      this.ctx.fillRect(element.x * this.stroke, this.height - element.y, this.stroke, element.y)
      
  draw_frame: (current_node) ->
    switch current_node.state
      when "unsorted"
        this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height)
        this.ctx.fillStyle = "rgb(45,123,200)"
        this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y)
      when "sorted"
        this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height)
        this.ctx.fillStyle = "rgb(255,153,0)"
        this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y)
      when "swap"
        this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height)
        this.ctx.fillStyle = "rgb(200,0,0)"
        this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y)
      when "swapped"
        this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height)
        this.ctx.fillStyle = "rgb(200,150,0)"
        this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y)
      when "iteration"
        this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height)
        this.ctx.fillStyle = "rgb(255,255,0)"
        this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y)
      when "minimum"
        this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height)
        this.ctx.fillStyle = "rgb(100,200,100)"
        this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y)
      when "possible_pivot"
        this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height)
        this.ctx.fillStyle = "rgb(102,204,102)"
        this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y)
      when "pivot"
        this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height)
        this.ctx.fillStyle = "rgb(102,204,102)"
        this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y)
      when "range"
        this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, current_node.y)
        this.ctx.fillStyle = "rgb(0,50,150)"
        this.ctx.fillRect(current_node.x * this.stroke, 0, this.stroke, current_node.y)        
      else 
        this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height)
        this.ctx.fillStyle = "rgb(45,123,200)"
        this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y)

  process_animation: (animation_list) ->
    if animation_list.length != 0
      new_frame = new Node(animation_list.first.x, animation_list.first.y)
      new_frame.state = animation_list.first.state
      this.draw_frame(new_frame)
      animation_list.remove_node(animation_list.first)
      window.setTimeout(
        () =>
          this.process_animation(animation_list)
        ,
          this.frame_rate
      )

$(document).ready () ->
  # number in milliseconds to pause between animation frames
  frame_rate    = 12
  
  # number in pixels to determine width of data set lines
  stroke        = 5
  canvas_height = parseInt($('#quick_sort').css('height').replace("px", ""))
  canvas_width  = parseInt($('#quick_sort').css('width').replace("px", ""))

  animate            = new Animate("quick_sort", canvas_height, canvas_width, stroke, frame_rate)
  quick              = new QuickSort(canvas_height, canvas_width, stroke)
  sorted_list        = new LinkedList()
  animation_list     = new LinkedList()
  
  # data array created belongs to the selection object
  quick.construct_array()
  
  # data array is passed to an animate object to be drawn
  animate.draw_array(quick.data)
  console.log "original data"
  console.log quick.data
  quick.quick_sort(0, quick.data.length - 1)
  console.log "after sorting"
  console.log quick.data
  animate.process_animation(quick.animation_list)
  # data array is sorted (via a selection sort) on the selection object's data array
  # quick.quick_sort()
  
  # a animation linked list created during the selection sort is passed to our animate object
  # animate.process_animation(selection.animation_list)