// Generated by CoffeeScript 1.3.3
(function() {
  var Animate, LinkedList, Node, QuickSort;

  QuickSort = (function() {

    function QuickSort(canvas_height, canvas_width, stroke) {
      this.canvas_height = canvas_height;
      this.canvas_width = canvas_width;
      this.stroke = stroke;
      this.data = [];
      this.sorted = [];
      this.animation_list = new LinkedList();
      this.canvas_height = this.canvas_height;
      this.canvas_width = this.canvas_width;
      this.stroke = this.stroke;
    }

    QuickSort.prototype.construct_array = function() {
      var _results;
      _results = [];
      while (this.data.length < (parseInt(this.canvas_width / this.stroke))) {
        _results.push(this.data.push(new Node(this.data.length, parseInt(Math.random() * 1000 % this.canvas_height))));
      }
      return _results;
    };

    QuickSort.prototype.exchange = function(index1, index2) {
      var temp;
      this.animation_list.add_animation_node(this.data[index1], "swap");
      this.animation_list.add_animation_node(this.data[index2], "swap");
      temp = this.data[index2];
      this.data[index2] = this.data[index1];
      this.data[index2].x = index2;
      this.data[index1] = temp;
      this.data[index1].x = index1;
      this.animation_list.add_animation_node(this.data[index1], "unsorted");
      return this.animation_list.add_animation_node(this.data[index2], "unsorted");
    };

    QuickSort.prototype.find_pivot = function(left, right) {
      var left_value, middle, middle_value, right_value;
      middle = Math.floor((left + right) / 2);
      middle_value = this.data[middle].y;
      left_value = this.data[left].y;
      right_value = this.data[right].y;
      this.animation_list.add_animation_node(this.data[left], "possible_pivot");
      this.animation_list.add_animation_node(this.data[right], "possible_pivot");
      this.animation_list.add_animation_node(this.data[middle], "possible_pivot");
      this.animation_list.add_animation_node(this.data[left], "possible_pivot");
      this.animation_list.add_animation_node(this.data[right], "possible_pivot");
      this.animation_list.add_animation_node(this.data[middle], "possible_pivot");
      if (left_value > middle_value) {
        this.exchange(left, middle);
      }
      if (left_value > right_value) {
        this.exchange(left, right);
      }
      if (middle_value > right_value) {
        this.exchange(middle, right);
      }
      this.exchange(left, middle);
      this.animation_list.add_animation_node(this.data[left], "pivot");
      this.animation_list.add_animation_node(this.data[right], "unsorted");
      this.animation_list.add_animation_node(this.data[middle], "unsorted");
      return this.data[left].y;
    };

    QuickSort.prototype.quick_sort = function(left, right) {
      var pivot, sort_left, sort_right;
      console.log("left: " + left + " right: " + right);
      console.log(this.data);
      this.count += 1;
      if ((right - left) > 2) {
        pivot = this.find_pivot(left, right);
        sort_left = left + 1;
        sort_right = right;
        while (sort_left <= sort_right) {
          while (sort_left < this.data.length - 1 && this.data[sort_left].y < pivot) {
            this.animation_list.add_animation_node(this.data[sort_left], "iteration");
            this.animation_list.add_animation_node(this.data[sort_left], "unsorted");
            sort_left += 1;
            console.log("sort_left: " + sort_left);
            console.log("length: " + this.data.length);
          }
          while (this.data[sort_right].y > pivot) {
            this.animation_list.add_animation_node(this.data[sort_right], "iteration");
            this.animation_list.add_animation_node(this.data[sort_right], "unsorted");
            sort_right -= 1;
          }
          if (sort_left <= sort_right) {
            this.exchange(sort_left, sort_right);
            sort_left += 1;
            sort_right -= 1;
          }
        }
        this.exchange(sort_left - 1, left);
        if (left < sort_right) {
          this.quick_sort(left, sort_right);
        }
        if (sort_left < right) {
          return this.quick_sort(sort_left, right);
        }
      } else {
        return this.quick_insertion(left, right);
      }
    };

    QuickSort.prototype.quick_insertion = function(left, right) {
      var count, min, range;
      console.log("insertion!");
      if (right - left > 0) {
        range = right - left + 1;
        min = left;
        count = 0;
        while (count < range) {
          if (this.data[left + count].y < this.data[min].y) {
            min = left + count;
          }
          count += 1;
        }
        this.exchange(min, left);
        this.animation_list.add_animation_node(this.data[left], "sorted");
        return this.quick_insertion(left + 1, right);
      }
    };

    QuickSort.prototype.first_unsorted_index = function() {
      var element, index, _i, _len, _ref;
      _ref = this.data;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        element = _ref[index];
        if (element.state === "unsorted") {
          return index;
        }
      }
      return null;
    };

    QuickSort.prototype.swap_elements = function(minimum) {
      var first, first_y;
      first = this.first_unsorted_index();
      first_y = this.data[first].y;
      this.animation_list.add_animation_node(this.data[first], "swap");
      this.animation_list.add_animation_node(this.data[minimum], "swap");
      this.animation_list.add_animation_node(this.data[first], "swap");
      this.animation_list.add_animation_node(this.data[minimum], "swap");
      this.data[first].y = this.data[minimum].y;
      this.data[minimum].y = first_y;
      this.data[first].state = "sorted";
      this.animation_list.add_animation_node(this.data[first], "swap");
      this.animation_list.add_animation_node(this.data[minimum], "swap");
      this.animation_list.add_animation_node(this.data[first], "swap");
      this.animation_list.add_animation_node(this.data[minimum], "swap");
      if (minimum === first) {
        return this.animation_list.add_animation_node(this.data[first], "sorted");
      } else {
        this.animation_list.add_animation_node(this.data[minimum], "unsorted");
        return this.animation_list.add_animation_node(this.data[first], "sorted");
      }
    };

    return QuickSort;

  })();

  Node = (function() {

    function Node(x, y) {
      this.x = x;
      this.y = y;
      this.x = this.x;
      this.y = this.y;
      this.prev = null;
      this.next = null;
      this.state = "unsorted";
    }

    Node.prototype.copy = function() {
      var temp_node;
      temp_node = new Node(this.x, this.y);
      temp_node.prev = this.prev;
      temp_node.next = this.next;
      return temp_node;
    };

    return Node;

  })();

  LinkedList = (function() {

    function LinkedList() {
      this.first = null;
      this.last = null;
      this.length = 0;
      this.max = 0;
    }

    LinkedList.prototype.selection_sort_swap = function(min, sorted_list, animation_list) {
      var length, node;
      length = 0;
      node = this.first;
      while (length < this.length) {
        if (min.x === node.x && min.y === node.y) {
          animation_list.add_animation_node(this.first, "swap");
          animation_list.add_animation_node(min, "swap");
          min.y = this.first.y;
          this.first.y = node.y;
          animation_list.add_animation_node(this.first, "swapped");
          animation_list.add_animation_node(min, "swapped");
          animation_list.add_animation_node(this.first, "unsorted");
          animation_list.add_animation_node(min, "unsorted");
          return;
        }
        node = node.prev;
        length += 1;
      }
    };

    LinkedList.prototype.remove_node = function(node) {
      if (this.length > 1) {
        if (node === this.first) {
          this.first = node.prev;
        }
        if (node === this.last) {
          this.last = node.next;
        }
      } else {
        this.first = null;
        this.last = null;
      }
      node.prev = null;
      node.next = null;
      return this.length -= 1;
    };

    LinkedList.prototype.add_node = function(node) {
      if (this.length === 0) {
        node.prev = node;
        node.next = node;
        this.first = node;
        this.last = node;
      } else {
        this.first.next = node;
        this.last.prev = node;
        node.prev = this.first;
        node.next = this.last;
        this.last = node;
      }
      return this.length += 1;
    };

    LinkedList.prototype.is_empty = function() {
      return this.length === 0;
    };

    LinkedList.prototype.add_animation_node = function(node, state) {
      var temp_node;
      temp_node = new Node(node.x, node.y);
      temp_node.state = state;
      return this.add_node(temp_node);
    };

    LinkedList.prototype.add_animation_nodes = function(left, right, data, canvas_height) {
      var count, node, range, _results;
      range = right - left;
      count = 0;
      _results = [];
      while (count < range) {
        node = new Node(left + count, canvas_height - data[left + count].y);
        this.add_animation_node(node, "range");
        _results.push(count += 1);
      }
      return _results;
    };

    return LinkedList;

  })();

  Animate = (function() {

    function Animate(id, canvas_height, canvas_width, stroke, frame_rate) {
      this.id = id;
      this.canvas_height = canvas_height;
      this.canvas_width = canvas_width;
      this.stroke = stroke;
      this.frame_rate = frame_rate;
      this.ctx = document.getElementById("" + this.id).getContext("2d");
      this.height = this.canvas_height;
      this.width = this.canvas_width;
      this.stroke = this.stroke;
      this.list_size = 0;
      this.frame_rate = this.frame_rate;
    }

    Animate.prototype.reset_canvas = function() {
      return this.ctx.clearRect(0, 0, this.height, this.width);
    };

    Animate.prototype.get_list_size = function(linked_list) {
      return this.list_size = linked_list.length;
    };

    Animate.prototype.draw_linked_list = function(linked_list) {
      var current_node, length, _results;
      length = 0;
      current_node = linked_list.first;
      _results = [];
      while (length < linked_list.length) {
        this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height);
        this.ctx.fillStyle = "rgb(45,123,200)";
        this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y);
        current_node = current_node.prev;
        _results.push(length += 1);
      }
      return _results;
    };

    Animate.prototype.draw_array = function(array) {
      var element, element_index, _i, _len, _results;
      _results = [];
      for (element_index = _i = 0, _len = array.length; _i < _len; element_index = ++_i) {
        element = array[element_index];
        this.ctx.clearRect(element.x * this.stroke, 0, this.stroke, this.height);
        this.ctx.fillStyle = "rgb(45,123,200)";
        _results.push(this.ctx.fillRect(element.x * this.stroke, this.height - element.y, this.stroke, element.y));
      }
      return _results;
    };

    Animate.prototype.draw_frame = function(current_node) {
      switch (current_node.state) {
        case "unsorted":
          this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height);
          this.ctx.fillStyle = "rgb(45,123,200)";
          return this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y);
        case "sorted":
          this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height);
          this.ctx.fillStyle = "rgb(255,153,0)";
          return this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y);
        case "swap":
          this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height);
          this.ctx.fillStyle = "rgb(200,0,0)";
          return this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y);
        case "swapped":
          this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height);
          this.ctx.fillStyle = "rgb(200,150,0)";
          return this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y);
        case "iteration":
          this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height);
          this.ctx.fillStyle = "rgb(255,255,0)";
          return this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y);
        case "minimum":
          this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height);
          this.ctx.fillStyle = "rgb(100,200,100)";
          return this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y);
        case "possible_pivot":
          this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height);
          this.ctx.fillStyle = "rgb(102,204,102)";
          return this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y);
        case "pivot":
          this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height);
          this.ctx.fillStyle = "rgb(102,204,102)";
          return this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y);
        case "range":
          this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, current_node.y);
          this.ctx.fillStyle = "rgb(0,50,150)";
          return this.ctx.fillRect(current_node.x * this.stroke, 0, this.stroke, current_node.y);
        default:
          this.ctx.clearRect(current_node.x * this.stroke, 0, this.stroke, this.height);
          this.ctx.fillStyle = "rgb(45,123,200)";
          return this.ctx.fillRect(current_node.x * this.stroke, this.height - current_node.y, this.stroke, current_node.y);
      }
    };

    Animate.prototype.process_animation = function(animation_list) {
      var new_frame,
        _this = this;
      if (animation_list.length !== 0) {
        new_frame = new Node(animation_list.first.x, animation_list.first.y);
        new_frame.state = animation_list.first.state;
        this.draw_frame(new_frame);
        animation_list.remove_node(animation_list.first);
        return window.setTimeout(function() {
          return _this.process_animation(animation_list);
        }, this.frame_rate);
      }
    };

    return Animate;

  })();

  $(document).ready(function() {
    var animate, animation_list, canvas_height, canvas_width, frame_rate, quick, sorted_list, stroke;
    frame_rate = 20;
    stroke = 4;
    canvas_height = parseInt($('#quick_sort').css('height').replace("px", ""));
    canvas_width = parseInt($('#quick_sort').css('width').replace("px", ""));
    animate = new Animate("quick_sort", canvas_height, canvas_width, stroke, frame_rate);
    quick = new QuickSort(canvas_height, canvas_width, stroke);
    sorted_list = new LinkedList();
    animation_list = new LinkedList();
    quick.construct_array();
    animate.draw_array(quick.data);
    console.log("original data");
    console.log(quick.data);
    quick.quick_sort(0, quick.data.length - 1);
    console.log("after sorting");
    console.log(quick.data);
    return animate.process_animation(quick.animation_list);
  });

}).call(this);
