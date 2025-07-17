"use client"

import CodeBlock from "@/components/code-block"
import {GlobalTheme, Link, ListItem, Theme, UnorderedList} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"

export default function PointerDocumentationPage() {
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
            <h1>裸指针及其修饰符</h1>
            
            <h4>1. 指针的定义</h4>
            <p>
              指针是存储对象内存地址的变量。在C和C++中，指针的用法有：
            </p>
            <Theme as="section" theme={theme}>
              <UnorderedList>
                <ListItem>分配堆内存的新对象</ListItem>
                <ListItem>向一个函数传递另外一个函数</ListItem>
                <ListItem>迭代数组或其他数据结构中的元素</ListItem>
              </UnorderedList>
            </Theme>
            <p>
              在C风格的编程中，裸指针适用于上述三种描述。但是裸指针是导致很多问题的元凶，因此除非在有显著性能优势且清楚在删除对象时哪个指针有最终的所有权时，不要用裸指针。现代C++提供智能指针来负责分配对象、迭代器和遍历数据结构们，以及传递函数时使用的lambda表达式。
            </p>
            
            <h4>2. 裸指针</h4>
            <p>
              <strong>裸指针的定义是：生命周期不受封装对象控制的指针</strong>，这不同于智能指针。裸指针可以被赋值为另一个非指针变量的地址，或者可以被赋值为<CodeBlock
              inline language="cpp">nullptr</CodeBlock>，未被赋值的裸指针随机被赋值一个地址。
            </p>
            <p>
              指针可以被取消引用（dereference），返回它指向的对象值：
            </p>
            <CodeBlock language="cpp">
              {`int* p = nullptr; // 声明指针并初始化，避免存储随机地址
int i = 5;
p = &i; // 将指针赋值为对象的地址
int j = *p; // 解引用p以检索其地址处的值`}
            </CodeBlock>
            
            <p>
              一个指针可以指向一个有类型的对象或者<CodeBlock inline language="cpp">void</CodeBlock>。当一个程序在heap分配对象时，它接收这个对象的地址（以指针的形式），如此的指针叫做owing
              pointer，一个owing pointer（or a copy of it），在不再需要那个heap
              object的时候，必须显式的free掉这个指针。否则就会内存泄漏，即此内存的地址没法给任何其他的程序去用了。用<CodeBlock
              inline language="cpp">new</CodeBlock>分配出来的内存必须搭配<CodeBlock inline
                                                                                    language="cpp">delete</CodeBlock>或者<CodeBlock
              inline language="cpp">delete[]</CodeBlock>：
            </p>
            <CodeBlock language="cpp">
              {`MyClass* mc = new MyClass(); // 在堆上分配对象
mc->print(); // 访问类成员
delete mc; // 删除对象（请不要忘记！）`}
            </CodeBlock>
            
            <p>
              一个指针，假设没有被声明为<CodeBlock inline language="cpp">const</CodeBlock>指针，那么就可以自增或者自减到内存中的其他位置，这种操作叫做指针的算术运算。在C语言中，数组的迭代（或其他数据结构）会用到这种运算。<CodeBlock
              inline language="cpp">const</CodeBlock>指针不能变更到内存的其他位置。
              在六十四位的操作系统中，指针就有六十四个bit，一个指针的尺寸决定于它的可寻址空间有多少。所有指针的拷贝都指向同一个内存地址，指针（同引用）在C++程序中经常被用于传递对象的地址（而不是传递整个大对象），当定义一个函数的时候，规定指针参数为<CodeBlock
              inline language="cpp">const</CodeBlock>，除非你想改这个对象，但是实际上，常引用比常量指针更常用于传递参数，除非此对象的值是<CodeBlock
              inline language="cpp">nullptr</CodeBlock>。
            </p>
            
            <h4>3. 数组与指针</h4>
            <p>
              指针和数组有很大的关联，当一个数组在函数传参的时候，它传递的是第一个元素的地址：
            </p>
            <CodeBlock language="cpp">
              {`#include <iostream>

void func(int arr[], int length)
{
    // 返回指针大小，这里没有用
    size_t test = sizeof(arr);

    for(int i = 0; i < length; ++i)
    {
        std::cout << arr[i] << " ";
    }
}

int main()
{
    int i[5]{ 1,2,3,4,5 };
    // sizeof(i) = 总字节数
    int j = sizeof(i) / sizeof(i[0]);
    func(i,j);
}`}
            </CodeBlock>
            <p>
              <CodeBlock inline language="cpp">sizeof</CodeBlock>操作符返回数组有几个bytes，除以一个元素的<CodeBlock
              inline
              language="cpp">sizeof</CodeBlock>就是数组的长度，当一个数组被当成参数的时候，会变成一个指针，<CodeBlock
              inline language="cpp">sizeof</CodeBlock>一个指针对于x86机器来说返回四个byte，对于x64机器来说返回8个byte。
              指针的算数运算可以用在非<CodeBlock inline language="cpp">const</CodeBlock>指针让它们指向其它内存地址，指针可以用<CodeBlock
              inline language="cpp">++</CodeBlock>, <CodeBlock inline language="cpp">+=</CodeBlock>, <CodeBlock inline
                                                                                                                language="cpp">-=</CodeBlock>, <CodeBlock
              inline language="cpp">--</CodeBlock>来自增或者自减，这种方法在没类型的数据面前特别有用，比如<CodeBlock
              inline language="cpp">void*</CodeBlock>指针会自增一个<CodeBlock inline language="cpp">byte</CodeBlock>，一个有类型的指针按照它指向的值的<CodeBlock
              inline language="cpp">sizeof</CodeBlock>自增。
            </p>
            
            <h4>4. 函数指针</h4>
            <p>
              允许函数被传递到其他函数中，在C语言中称作call backs，现代 C++ 转而使用lambda表达式。
            </p>
            <p>
              一个函数指针声明指定了被指向函数必须具有的签名：
            </p>
            <CodeBlock language="cpp">
              {`// 声明指向任何函数的指针...

// ...接受字符串并返回字符串
string (*g)(string a);

// 没有返回值和参数
void (*x)();

// ...返回int并接受三个指定类型的参数
int (*i)(int i, string s, double d);`}
            </CodeBlock>
            
            <h4>5. void* 指针</h4>
            <p>
              A pointer to void simply points to a raw memory location. Sometimes it's necessary to use <CodeBlock
              inline language="cpp">void*</CodeBlock> pointers, for example when passing between C++ code and C
              functions.
            </p>
            <p>
              When a typed pointer is cast to a void pointer, the contents of the memory location are unchanged.
              However, the type information is lost, so that you can't do increment or decrement operations. A memory
              location can be cast, for example, from <CodeBlock inline
                                                                 language="cpp">MyClass*</CodeBlock> to <CodeBlock
              inline language="cpp">void*</CodeBlock> and back again to <CodeBlock inline
                                                                                   language="cpp">MyClass*</CodeBlock>.
              Such operations are inherently error-prone and require great care to avoid errors.
            </p>
            <p>
              <strong>Modern C++ discourages the use of void pointers in almost all circumstances.</strong>
            </p>
            
            <h4>6. const 和 volatile 修饰符</h4>
            <p>
              <CodeBlock inline language="cpp">const</CodeBlock>和<CodeBlock inline language="cpp">volatile</CodeBlock>关键字改变了系统对待指针的方式，<CodeBlock
              inline language="cpp">const</CodeBlock>指针规定在初始化之后其值不能被修改，也就是说指针被保护以至于不能被修改。<CodeBlock
              inline language="cpp">volatile</CodeBlock>关键字规定了值可以被其他程序改变的变量（多线程？）因此，<CodeBlock
              inline language="cpp">volatile</CodeBlock>关键字用于声明shared memory中可以被多线程修改的或者全局的数据（用于沟通的、用于interrupt
              service routines的）
              当一个变量被声明为<CodeBlock inline language="cpp">volatile</CodeBlock>时，每一次程序要访问这个变量时，编译器都从内存重新读取它的值，这样显著的减少了编译器优化，however，当变量的状态可以不寻常的改变时，这是唯一允许这个程序可以正常运行的方式。
            </p>
            
            <p>
              要将指针指向的对象声明为<CodeBlock inline language="cpp">const</CodeBlock>或<CodeBlock inline
                                                                                                     language="cpp">volatile</CodeBlock>，使用以下形式的声明：
            </p>
            <CodeBlock language="cpp">
              {`const char *cpch;  // 指向const char的指针
volatile char *vpch; // 指向volatile char的指针`}
            </CodeBlock>
            
            <p>
              要声明指针的值（即存储在指针中的实际地址）为<CodeBlock inline language="cpp">const</CodeBlock>或<CodeBlock
              inline language="cpp">volatile</CodeBlock>，使用以下形式的声明：
            </p>
            <CodeBlock language="cpp">
              {`char * const pchc;   // const指针，指向char
char * volatile pchv; // volatile指针，指向char`}
            </CodeBlock>
            
            <p>
              参考资料：<Link
              href="https://www.cnblogs.com/chio/archive/2007/11/24/970632.html">volatile关键字详解</Link> 和
              <Link href="https://learn.microsoft.com/en-us/cpp/cpp/const-and-volatile-pointers?view=msvc-160">Microsoft
                Docs - const和volatile指针</Link>
            </p>
          </div>
        </div>
      </GlobalTheme>
    </>
  )
}