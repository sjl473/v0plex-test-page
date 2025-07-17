"use client"

import CodeBlock from "@/components/code-block"
import {GlobalTheme, Link} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"

export default function SharedPtrPage() {
  const {theme} = useTheme()

  return (
    <>
      <style jsx>{`
        h1 {
          font-weight: bolder;
          font-size: 4rem;
          color: ${theme === 'white' ? '#491d8b' : '#be95ff'};
        }

        h4 {
          color: ${theme === 'g100' ? '#78a9ff' : '#002d9c'};
        }

        strong {
          color: ${theme === 'white' ? '#740937' : '#ffafd2'};
        }
      `}</style>

      <GlobalTheme theme={theme}>
        <div className="v0plex-content">
          <div className="page-typography-content">
            <h1>shared_ptr用例详解</h1>

            <h4>1. std::make_shared</h4>
            <p>
              <CodeBlock inline language="cpp">std::pair</CodeBlock>的first和second是第一个成员和第二个成员，第一个first和第二个second可以不一样：
            </p>
            <CodeBlock language="cpp">
              {`// make_pair example
#include <utility>      // std::pair
#include <iostream>     // std::cout

int main () {
  std::pair <int,int> foo;
  std::pair <int,int> bar;

  foo = std::make_pair (10,20);
  bar = std::make_pair (10.5,'A'); // ok: implicit conversion from pair<double,char>

  std::cout << "foo: " << foo.first << ", " << foo.second << '\\n';
  std::cout << "bar: " << bar.first << ", " << bar.second << '\\n';

  return 0;
}`}
            </CodeBlock>

            <p>
              <CodeBlock inline language="cpp">std::pair</CodeBlock>的赋值操作：
            </p>
            <CodeBlock language="cpp">
              {`// pair::operator= example
#include <utility>      // std::pair, std::make_pair
#include <string>       // std::string
#include <iostream>     // std::cout

int main () {
  std::pair <std::string,int> planet, homeplanet;

  planet = std::make_pair("Earth",6371);

  homeplanet = planet;

  std::cout << "Home planet: " << homeplanet.first << '\\n';
  std::cout << "Planet size: " << homeplanet.second << '\\n';
  return 0;
}`}
            </CodeBlock>

            <p>
              <CodeBlock inline language="cpp">std::make_shared</CodeBlock>的两种构造形式：
            </p>
            <CodeBlock language="cpp">
              {`// make_shared example
#include <iostream>
#include <memory>

int main () {
  std::shared_ptr<int> foo = std::make_shared<int> (10);
  // same as:
  std::shared_ptr<int> foo2 (new int(10));

  auto bar = std::make_shared<int> (20);

  auto baz = std::make_shared<std::pair<int,int>> (30,40);

  std::cout << "*foo: " << *foo << '\\n';
  std::cout << "*bar: " << *bar << '\\n';
  std::cout << "*baz: " << baz->first << ' ' << baz->second << '\\n';

  return 0;
}`}
            </CodeBlock>

            <h4>2. allocate_shared</h4>
            <p>
              文档里有说 This function uses alloc to allocate storage for the object. A similar function, make_shared
              uses <CodeBlock inline language="cpp">::new</CodeBlock> to allocate the storage instead. 这个是用alloc分配的：
            </p>
            <CodeBlock language="cpp">
              {`// allocate_shared example
#include <iostream>
#include <memory>

int main () {
  std::allocator<int> alloc;    // the default allocator for int
  std::default_delete<int> del; // the default deleter for int

  std::shared_ptr<int> foo = std::allocate_shared<int> (alloc,10);

  auto bar = std::allocate_shared<int> (alloc,20);

  auto baz = std::allocate_shared<std::pair<int,int>> (alloc,30,40);

  std::cout << "*foo: " << *foo << '\\n';
  std::cout << "*bar: " << *bar << '\\n';
  std::cout << "*baz: " << baz->first << ' ' << baz->second << '\\n';

  return 0;
}`}
            </CodeBlock>

            <h4>3. std::static_pointer_cast</h4>
            <CodeBlock language="cpp">
              {`// static_pointer_cast example
#include <iostream>
#include <memory>

struct A {
  static const char* static_type;
  const char* dynamic_type;
  A() { dynamic_type = static_type; }
};
struct B: A {
  static const char* static_type;
  B() { dynamic_type = static_type; }
};

const char* A::static_type = "class A";
const char* B::static_type = "class B";

int main () {
  std::shared_ptr<A> foo;
  std::shared_ptr<B> bar;

  foo = std::make_shared<A>();

  // cast of potentially incomplete object, but ok as a static cast:
  bar = std::static_pointer_cast<B>(foo);

  std::cout << "foo's static  type: " << foo->static_type << '\\n';
  std::cout << "foo's dynamic type: " << foo->dynamic_type << '\\n';
  std::cout << "bar's static  type: " << bar->static_type << '\\n';
  std::cout << "bar's dynamic type: " << bar->dynamic_type << '\\n';

  return 0;
}`}
            </CodeBlock>
            <p>
              输出:
            </p>
            <CodeBlock>
              {`foo's static  type: class A
foo's dynamic type: class A
bar's static  type: class B
bar's dynamic type: class A`}
            </CodeBlock>
            <p>
              首先，定义两个类的静态成员：
              <br/>
              - <CodeBlock inline language="cpp">const char* A::static_type = "class A"</CodeBlock>
              <br/>
              - <CodeBlock inline language="cpp">const char* B::static_type = "class B"</CodeBlock>

              <br/><br/>
              初始化两个智能指针：
              <br/>
              <CodeBlock inline language="cpp">std::shared_ptr&lt;A&gt; foo = nullptr;</CodeBlock>
              <br/>
              <CodeBlock inline language="cpp">std::shared_ptr&lt;B&gt; bar = nullptr;</CodeBlock>

              <br/><br/>
              为 foo 分配 A 类实例：
              <br/>
              <CodeBlock inline language="cpp">foo = std::make_shared&lt;A&gt;();</CodeBlock>
              <br/>
              此时 foo 对象的动态类型为：<CodeBlock inline language="cpp">"class A"</CodeBlock>

              <br/><br/>
              执行静态类型转换：
              <br/>
              <CodeBlock inline language="cpp">bar = std::static_pointer_cast&lt;B&gt;(foo);</CodeBlock>
              <br/>
              转换结果：
              <br/>
              - bar 现在指向与 foo 相同的对象
              <br/>
              - bar 的<strong>静态类型</strong>保持为 <CodeBlock inline language="cpp">B::static_type</CodeBlock>（值："class
              B"）
              <br/>
              - bar 的<strong>动态类型</strong>继承自 foo：<CodeBlock inline language="cpp">"class A"</CodeBlock>

              <br/><br/>
              关键说明：static_pointer_cast 仅改变指针类型，不影响：
              <br/>
              1. 对象的实际动态类型（仍为 A）
              <br/>
              2. 类的静态成员（B::static_type 保持独立）
            </p>
            <h4>4. const_pointer_cast</h4>
            <p>
              虽然cpp官网上对于普通指针的const cast讲解例子只写了如何去除一个const，但是它有明确的说一点"either to be set
              or to be removed"，所以我们可以猜出，去除 / 添加一个const在智能指针里也是合法的：
            </p>
            <CodeBlock language="cpp">
              {`// static_pointer_cast example
#include <iostream>
#include <memory>

int main () {
  std::shared_ptr<int> foo;
  std::shared_ptr<const int> bar;

  foo = std::make_shared<int>(10);

  bar = std::const_pointer_cast<const int>(foo);

  std::cout << "*bar: " << *bar << '\\n';
  *foo = 20;
  std::cout << "*bar: " << *bar << '\\n';
forma
  return 0;
}`}
            </CodeBlock>
            <p>
              这个例子里，是说如何把一个<CodeBlock inline language="cpp">int*</CodeBlock> 变成 <CodeBlock inline
                                                                                                         language="cpp">const
              int*</CodeBlock>, c++ 的const cast大部分情况下是可以按照你预期的结果正常工作的，但是也有些许例外，这取决于如何声明、编译器如何优化。上面的例子里，输出结果是10和20
            </p>

            <h4>5. get_deleter</h4>
            <CodeBlock language="cpp">
              {`// get_deleter example
#include <iostream>
#include <memory>

struct D {    // a verbose array deleter:
  void operator()(int* p) {
    std::cout << "[deleter called]\\n";
    delete[] p;
  }
};

int main () {
  std::shared_ptr<int> foo (new int[10],D());

  int * bar = new int[20];

  // use foo's deleter to delete bar (which is unmanaged):
  (*std::get_deleter<D>(foo))(bar);

  return 0;
  // foo's deleter called automatically
}`}
            </CodeBlock>
            <p>
              首先这个例子初始化了一个有10单位长度智能指针，由于它声明的是<CodeBlock inline
                                                                                    language="cpp">int</CodeBlock>，然后第一个参数是一个<CodeBlock
              inline language="cpp">int[]</CodeBlock>，所以普通的std deleter是不管用的，只删除首地址，要自定义删除器D
            </p>
            <CodeBlock language="cpp">
              {`struct D {
    void operator()(int* p) {
        std::cout << "";
        delete[] p;
    }
}`}
            </CodeBlock>
            <p>
              注意是谁<CodeBlock inline language="cpp">delete[] p</CodeBlock>，这是手动构造删除器的目的，下面还有一个<CodeBlock inline language="cpp">int * bar = new int [20]</CodeBlock>，我们用<CodeBlock inline
                                   language="cpp">std::get_deleter&lt;D&gt; (foo)</CodeBlock>，可以删除foo，这个类型是一个删除器指针，于是，我们可以连续使用指针运算符:
            </p>
            <CodeBlock>
              {`(*std::get_deleter<D>(foo)) // 还是一个删除器`}
            </CodeBlock>
            <p>
              于是
            </p>
            <CodeBlock>
              {`(*std::get_deleter<D>(foo))(bar); // 删除bar`}
            </CodeBlock>
            <p>
              网上有很多深刻的讨论关于为什么智能指针有两种获取deleter的方式，大概是unique的要设计成模版，为了保持低内存而不把deleter当作类内的一部分，shared并不太过care内存，所以两种获取方式也就可以理解了。
            </p>

            <h4>6. swap</h4>
            <p>
              swap是重载的函数：
            </p>
            <CodeBlock language="cpp">
              {`// shared_ptr swap specialization
#include <iostream>
#include <memory>

int main () {
  std::shared_ptr<int> foo (new int(10));
  std::shared_ptr<int> bar (new int(20));

  swap(foo,bar);

  std::cout << "foo: " << *foo << '\\n';
  std::cout << "bar: " << *bar << '\\n';

  return 0;
}`}
            </CodeBlock>

            <h4>7. operator &lt;&lt;</h4>
            <CodeBlock language="cpp">
              {`// shared_ptr i/o
#include <iostream>
#include <memory>

int main () {
  std::shared_ptr<int> foo (new int (10));

  std::cout << " foo: " << foo << '\\n';
  std::cout << "*foo: " << *foo << '\\n';

  return 0;
}`}
            </CodeBlock>
            <p>
              输出结果是：
            </p>
            <CodeBlock>
              {` foo: 0x920d90
*foo: 10`}
            </CodeBlock>
            <p>
              注：我还没有试过unique ptr是否有 <CodeBlock inline language="cpp">&lt;&lt;</CodeBlock> 的 operator
              overloading ，反正文档上没有
            </p>

            <h4>8. relational operator</h4>
            <p>
              <strong>截止到这，上述的所有东西统统都不是类函数</strong>
            </p>

            <h4>9. 引用计数示例</h4>
            <p>
              下述例子来源 <Link
              href="https://www.cnblogs.com/jiayayao/p/6128877.html">https://www.cnblogs.com/jiayayao/p/6128877.html</Link>
            </p>
            <CodeBlock language="cpp">
              {`#include "stdafx.h"
#include <iostream>
#include <future>
#include <thread>

using namespace std;

class Person
{
public:
    Person(int v) {
        value = v;
        std::cout << "Cons" << value << std::endl;
    }
    ~Person() {
        std::cout << "Des" << value << std::endl;
    }
    int value;
};

int main()
{
    std::shared_ptr<Person> p1(new Person(1));     // Person(1)的引用计数为1
    std::shared_ptr<Person> p2 = std::make_shared<Person>(2);

    p1.reset(new Person(3));                       // 首先生成新对象Person(3)
                                                    // 然后引用计数减1，引用计数为0
                                                    // 故析构Person(1)
                                                    // 最后将新对象的指针交给智能指针

    std::shared_ptr<Person> p3 = p1;               // 现在p1和p3同时指向Person(3)
                                                    // Person(3)的引用计数为2

    p1.reset();                                     // Person(3)的引用计数为1
    p3.reset();                                     // Person(3)的引用计数为0，析构Person(3)

    return 0;
}`}
            </CodeBlock>

            <h4>引用计数机制解析</h4>
            <p>
              引用计数是 <CodeBlock inline language="cpp">shared_ptr</CodeBlock> 的核心机制，让我们通过内存布局来理解：
            </p>

            <h5>1. 初始化阶段</h5>
            <p>
              <CodeBlock inline language="cpp">std::shared_ptr&lt;Person&gt; p1(new Person(1))</CodeBlock>
              <br/>
              - 在堆区创建 Person(1) 对象，地址假设为 hp1
              <br/>
              - 在栈区创建 shared_ptr p1，指向 hp1
              <br/>
              - 引用计数：1
            </p>

            <p>
              <CodeBlock inline language="cpp">std::shared_ptr&lt;Person&gt; p2 = std::make_shared&lt;Person&gt;(2)</CodeBlock>
              <br/>
              - 在堆区创建 Person(2) 对象，地址假设为 hp2
              <br/>
              - 在栈区创建 shared_ptr p2，指向 hp2
              <br/>
              - 引用计数：1
            </p>

            <h5>2. reset 操作</h5>
            <p>
              <CodeBlock inline language="cpp">p1.reset(new Person(3))</CodeBlock> 的执行过程：
              <br/>
              1. 在堆区创建 Person(3) 对象，地址假设为 hp3
              <br/>
              2. 执行 reset 函数，hp1 的引用计数减1，变为 0
              <br/>
              3. 引用计数为 0，析构 Person(1)，hp1 被释放
              <br/>
              4. 将 hp3 交给 p1 管理，hp3 的引用计数变为 1
            </p>

            <h5>3. 复制操作</h5>
            <p>
              <CodeBlock inline language="cpp">std::shared_ptr&lt;Person&gt; p3 = p1</CodeBlock>
              <br/>
              - 创建 shared_ptr p3，复制 p1 的内容
              <br/>
              - 现在 p1 和 p3 都指向 hp3
              <br/>
              - hp3 的引用计数变为 2
            </p>

            <h5>4. 清理阶段</h5>
            <p>
              <CodeBlock inline language="cpp">p1.reset()</CodeBlock>：hp3 的引用计数减1，变为 1
              <br/>
              <CodeBlock inline language="cpp">p3.reset()</CodeBlock>：hp3 的引用计数减1，变为 0，析构 Person(3)
            </p>

            <div>
              <p>
引用计数机制确保当最后一个 shared_ptr 被销毁时，所管理的对象才会被自动释放。
              </p>
            </div>

            <h4>10. 注意事项</h4>
            <p>
              来源cpp prime的一句话：shared_ptr自动销毁所管理的对象
              当指向一个对象的最后一个shared_ptr被销毁时，shared_ptr类会自动销毁此对象，它是通过另一个特殊的成员函数-析构函数完成销毁工作的，类似于构造函数，每个类都有一个析构函数。析构函数控制对象销毁时做什么操作。析构函数一般用来释放对象所分配的资源。shared_ptr的析构函数会递减它所指向的对象的引用计数。如果引用计数变为0，shared_ptr的析构函数就会销毁对象，并释放它所占用的内存。
            </p>
            <p>
              不要用一个原始指针初始化多个shared_ptr，原因在于，会造成二次销毁：
            </p>
            <CodeBlock language="cpp">
              {`int *p5 = new int;
std::shared_ptr<int> p6(p5);
std::shared_ptr<int> p7(p5);// logic error`}
            </CodeBlock>
            <p>
              上述代码很好理解，二次销毁
            </p>
            <p>
              另外，不要在函数实参中创建shared_ptr：
            </p>
            <CodeBlock>
              {`// 错
function(shared_ptr<int>(new int), g());`}
            </CodeBlock>
            <p>
              通过查阅文档我们发现unique ptr的默认删除器是支持释放数组对象的，如: <CodeBlock inline
                                                                                            language="cpp">std::unique_ptr&lt;int[]&gt; foo
              (new int[5]);</CodeBlock> 但是shared ptr 不支持<CodeBlock inline
                                                                        language="cpp">[]</CodeBlock> ，所以我们要自定义deleter
            </p>
            <p>
              另外，注意unique ptr可以转shared ptr，反过来不可，比如：
            </p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <memory>
using namespace std;

class A{
public:
    string id;
    A(string id):id(id){cout<<id<<"：构造函数"<<endl;}
    ~A(){cout<<id<<"：析构函数"<<endl;}
};

int main() {
    unique_ptr<A> a(new A("unique_ptr"));
    shared_ptr<A> b = move(a);
//    a = move(b);  // 报错
//    a.reset(b.get());  // 运行错误
    cout<<a.get()<<endl;
    return 0;
}`}
            </CodeBlock>
            <p>
              用get拿到智能指针的裸指针之后删掉它，会导致智能指针运行错误
            </p>
            <p>
              不要用stack中的变量地址初始化一个smart pointer：
            </p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <memory>
using namespace std;

class A{
public:
    string id;
    A(string id):id(id){cout<<id<<"：构造函数"<<endl;}
    ~A(){cout<<id<<"：析构函数"<<endl;}
};

A a("全局变量");

int main() {
    A b("局部变量");
//    unique_ptr<A> pa(&a); // 运行错误
    unique_ptr<A> pa(&b);
    return 0;
}`}
            </CodeBlock>
            <p>
              谨慎使用智能指针的get与release方法
              通过unique_ptr.release()方法返回的裸指针，需要我们自己delete删除对象，因为调用release方法后，该unique_ptr不再拥有对象的所有权。
            </p>

            <h4>11. shared_ptr成员函数</h4>
            <p>
              构造函数：
            </p>
            <CodeBlock language="cpp">
              {`// shared_ptr constructor example
#include <iostream>
#include <memory>

struct C {int* data;};

int main () {
  std::shared_ptr<int> p1;
  std::shared_ptr<int> p2 (nullptr);
  std::shared_ptr<int> p3 (new int);
  std::shared_ptr<int> p4 (new int, std::default_delete<int>());
  std::shared_ptr<int> p5 (new int, [](int* p){delete p;}, std::allocator<int>());
  std::shared_ptr<int> p6 (p5);
  std::shared_ptr<int> p7 (std::move(p6));
  std::shared_ptr<int> p8 (std::unique_ptr<int>(new int));
  std::shared_ptr<C> obj (new C);
  std::shared_ptr<int> p9 (obj, obj->data);

  std::cout << "use_count:\\n";
  std::cout << "p1: " << p1.use_count() << '\\n';
  std::cout << "p2: " << p2.use_count() << '\\n';
  std::cout << "p3: " << p3.use_count() << '\\n';
  std::cout << "p4: " << p4.use_count() << '\\n';
  std::cout << "p5: " << p5.use_count() << '\\n';
  std::cout << "p6: " << p6.use_count() << '\\n';
  std::cout << "p7: " << p7.use_count() << '\\n';
  std::cout << "p8: " << p8.use_count() << '\\n';
  std::cout << "p9: " << p9.use_count() << '\\n';
  return 0;
}`}
            </CodeBlock>
            <p>
              输出结果：
            </p>
            <CodeBlock>
              {`use_count:
p1: 0
p2: 0
p3: 1
p4: 1
p5: 2
p6: 0
p7: 2
p8: 1
p9: 2`}
            </CodeBlock>
            <p>
              p1的ref count是0，p2的ref count是0，p3是1，p4是1，p5是1，p6是2，p5是2，p6因为move了变成0，p7是2, p8是1
            </p>

            <p>
              析构函数：
            </p>
            <CodeBlock language="cpp">
              {`// shared_ptr destructor example
#include <iostream>
#include <memory>

int main () {
  auto deleter = [](int*p){
    std::cout << "[deleter called]\\n"; delete p;
  };

  std::shared_ptr<int> foo (new int,deleter);

  std::cout << "use_count: " << foo.use_count() << '\\n';

  return 0;                        // [deleter called]
}`}
            </CodeBlock>
            <p>
              输出：
            </p>
            <CodeBlock>
              {`use_count: 1
[deleter_called]`}
            </CodeBlock>

            <p>
              我们可以看到，它自定义了一个deleter，这个deleter是个lambda表达式，然后&lt;&gt;里是没有那个unique
              ptr的deleter参数的
            </p>

            <p>
              operator=：
            </p>
            <CodeBlock language="cpp">
              {`// shared_ptr::operator= example
#include <iostream>
#include <memory>

int main () {
  std::shared_ptr<int> foo;
  std::shared_ptr<int> bar (new int(10));

  foo = bar;                          // copy

  bar = std::make_shared<int> (20);   // move

  std::unique_ptr<int> unique (new int(30));
  foo = std::move(unique);            // move from unique_ptr

  std::cout << "*foo: " << *foo << '\\n';
  std::cout << "*bar: " << *bar << '\\n';

  return 0;
}`}
            </CodeBlock>
            <p>
              输出：
            </p>
            <CodeBlock>
              {`*foo: 30
*bar: 20`}
            </CodeBlock>

            <p>
              swap：
            </p>
            <CodeBlock language="cpp">
              {`// shared_ptr::swap example
#include <iostream>
#include <memory>

int main () {
  std::shared_ptr<int> foo (new int(10));
  std::shared_ptr<int> bar (new int(20));

  foo.swap(bar);

  std::cout << "*foo: " << *foo << '\\n';
  std::cout << "*bar: " << *bar << '\\n';

  return 0;
}`}
            </CodeBlock>
            <p>
              输出：
            </p>
            <CodeBlock>
              {`*foo: 20
*bar: 10`}
            </CodeBlock>

            <p>
              get()：
            </p>
            <CodeBlock language="cpp">
              {`// shared_ptr::get example
#include <iostream>
#include <memory>

int main () {
  int* p = new int (10);
  std::shared_ptr<int> a (p);

  if (a.get()==p)
    std::cout << "a and p point to the same location\\n";

  // three ways of accessing the same address:
  std::cout << *a.get() << "\\n";
  std::cout << *a << "\\n";
  std::cout << *p << "\\n";

  return 0;
}`}
            </CodeBlock>
            <p>
              输出：
            </p>
            <CodeBlock>
              {`a and p point to the same location
10
10
10`}
            </CodeBlock>

            <p>
              operator*：
            </p>
            <CodeBlock language="cpp">
              {`// shared_ptr::operator*
#include <iostream>
#include <memory>

int main () {
  std::shared_ptr<int> foo (new int);
  std::shared_ptr<int> bar (new int (100));

  *foo = *bar * 2;

  std::cout << "foo: " << *foo << '\\n';
  std::cout << "bar: " << *bar << '\\n';

  return 0;
}`}
            </CodeBlock>
            <p>
              输出：
            </p>
            <CodeBlock>
              {`foo: 200
bar: 100`}
            </CodeBlock>

            <p>
              operator-&gt;：
            </p>
            <CodeBlock language="cpp">
              {`// shared_ptr::operator->
#include <iostream>
#include <memory>

struct C { int a; int b; };

int main () {
  std::shared_ptr<C> foo;
  std::shared_ptr<C> bar (new C);

  foo = bar;

  foo->a = 10;
  bar->b = 20;

  if (foo) std::cout << "foo: " << foo->a << ' ' << foo->b << '\\n';
  if (bar) std::cout << "bar: " << bar->a << ' ' << bar->b << '\\n';

  return 0;
}`}
            </CodeBlock>
            <p>
              输出：
            </p>
            <CodeBlock>
              {`foo: 10 20
bar: 10 20`}
            </CodeBlock>

            <p>
              use_count()：
            </p>
            <p>
              Returns the number of shared_ptr objects that share ownership over the same pointer as this object
              (including it).
              If this is an empty shared_ptr, the function returns zero.
              Library implementations are not required to keep a count of any particular set of owners, and thus it may
              not be efficient to call this function. To check specifically whether use_count is 1, you can use member
              unique instead, which may be faster. 让你用unique检测有么有至少一个引用
            </p>

            <p>
              unique()：
            </p>
            <CodeBlock language="cpp">
              {`// shared_ptr::unique
#include <iostream>
#include <memory>

int main () {
  std::shared_ptr<int> foo;
  std::shared_ptr<int> bar (new int);

  std::cout << "foo unique?\\n" << std::boolalpha;

  std::cout << "1: " << foo.unique() << '\\n';  // false (empty)

  foo = bar;
  std::cout << "2: " << foo.unique() << '\\n';  // false (shared with bar)

  bar = nullptr;
  std::cout << "3: " << foo.unique() << '\\n';  // true

  return 0;
}`}
            </CodeBlock>
            <p>
              输出：
            </p>
            <CodeBlock>
              {`foo unique?
1: false
2: false
3: true`}
            </CodeBlock>

            <p>
              operator bool：
            </p>
            <CodeBlock language="cpp">
              {`// example of shared_ptr::operator bool
#include <iostream>
#include <memory>

int main () {
  std::shared_ptr<int> foo;
  std::shared_ptr<int> bar (new int(34));

  if (foo) std::cout << "foo points to " << *foo << '\\n';
  else std::cout << "foo is null\\n";

  if (bar) std::cout << "bar points to " << *bar << '\\n';
  else std::cout << "bar is null\\n";

  return 0;
}`}
            </CodeBlock>
            <p>
              输出：
            </p>
            <CodeBlock>
              {`foo is null
bar points to 34`}
            </CodeBlock>

          </div>
        </div>
      </GlobalTheme>
    </>
  )
}

